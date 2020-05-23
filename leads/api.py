from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
import django.core.exceptions as exceptions
from django.core.paginator import EmptyPage

from leads.models import User, Post, Tag, Like, Comment, Subscription
from leads.functions import paginate
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import api_view, parser_classes
from rest_framework.parsers import JSONParser, MultiPartParser, FormParser
from rest_framework.response import Response
from django.db.utils import IntegrityError
from django.db.models import Q
from .serializers import UserSerializer, SettingsUserSerializer, ShortUserSerializer, ShortPostSerializer, \
    PostSerializer, SignUpUserSerializer, CommentSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = UserSerializer


@api_view(['POST'])
@parser_classes([MultiPartParser])
def sign_in(request):
    username = request.POST['username']
    password = request.POST['password']
    user = authenticate(request, username=username, password=password)
    if user is not None:
        login(request, user)
        response = Response(status=status.HTTP_200_OK)
        response.set_cookie("authorized", 1, 1209600, 1209600)
        return response
    else:
        return Response(status=status.HTTP_403_FORBIDDEN)


@api_view(['POST'])
@parser_classes([MultiPartParser])
def log_out(request):
    logout(request)
    response = Response(status=status.HTTP_200_OK)
    response.delete_cookie("authorized")
    return response


@api_view(['POST'])
@parser_classes([MultiPartParser])
def register(request):
    serializer = SignUpUserSerializer(data=request.data)
    if serializer.is_valid():
        email = request.POST['email']
        username = request.POST['username']
        name = request.POST['name']
        password = request.POST['password']
        User.objects.create_user(email, username, name, password)
        user = authenticate(request, username=username, password=password)
        login(request, user)
        response = Response(status=status.HTTP_201_CREATED)
        response.set_cookie("authorized", 1, 1209600, 1209600)
        return response
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@login_required
def header_data(request):
    try:
        user_serializer = UserSerializer(request.user)
        return Response(user_serializer.data)
    except exceptions.ObjectDoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
@login_required
def user_home(request):
    user_serializer = UserSerializer(request.user)
    posts = request.user.post.all()
    post_serializer = ShortPostSerializer(posts, many=True)
    return Response({'user_data': user_serializer.data, 'posts': post_serializer.data})


@api_view(['GET'])
@login_required
def get_user(request):
    user_id = request.GET['id']
    try:
        founded_user = User.objects.get(pk=user_id)
        user_serializer = UserSerializer(founded_user)
        posts = User.objects.get(pk=user_id).post.all()
        post_serializer = ShortPostSerializer(posts, many=True)
        is_following = False
        if request.user.following.filter(following=founded_user):
            is_following = True
        return Response({'user_data': user_serializer.data, 'posts': post_serializer.data, 'is_following': is_following})
    except exceptions.ObjectDoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)


@api_view(['GET', 'POST'])
@login_required
def settings(request):
    if request.method == 'GET':
        serializer = SettingsUserSerializer(request.user)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = SettingsUserSerializer(request.user, request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
@login_required
def change_password(request):
    user = User.objects.get(pk=request.user.id)
    if request.method == 'GET':
        serializer = ShortUserSerializer(user)
        return Response(serializer.data)
    elif request.method == 'POST':
        if user.check_password(request.POST['password']):
            new_password = request.POST['new_password']
            user.set_password(new_password)
            user.save()
            user = authenticate(request, username=user.username, password=new_password)
            login(request, user)
            return Response(status=status.HTTP_201_CREATED)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
@login_required
def post(request):
    user = request.user
    if request.method == 'GET':
        if 'self' in request.GET:
            posts = user.post.all()
            serializer = ShortPostSerializer(posts, many=True)
            return Response(serializer.data)
        if 'id' in request.GET:
            post = Post.objects.get(pk=request.GET['id'])
            serializer = PostSerializer(post)
            is_liked = True if request.user.post_likes.filter(post=post) else False
            is_owner = True if post.author == request.user else False
            return Response({'post': serializer.data, 'is_liked': is_liked, 'is_owner': is_owner})
        return Response(status.HTTP_400_BAD_REQUEST)
    elif request.method == 'POST':
        try:
            image = request.FILES['image']
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        description = request.POST['description']
        post = Post(author=user, content=image, description=description)
        try:
            post.full_clean()
        except exceptions.ValidationError:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        post.save()
        return Response(status=status.HTTP_201_CREATED)


@api_view(['GET'])
@login_required
def get_user_posts(request):
    if 'id' not in request.GET:
        posts = request.user.post.all()
        serializer = ShortPostSerializer(posts, many=True)
        return Response(serializer.data)
    posts = User.objects.get(pk=request.GET['id']).post.all()
    serializer = ShortPostSerializer(posts, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@login_required
@parser_classes([JSONParser])
def like(request):
    post = Post.objects.get(pk=request.data['id'])
    new_like = Like(post=post, user=request.user)
    try:
        new_like.save()
    except IntegrityError as e:
        Like.objects.filter(user=request.user).delete()

    return Response({'likes': post.likes.count()}, status=status.HTTP_201_CREATED)


@api_view(['POST'])
@login_required
def comment(request):
    post = Post.objects.get(pk=request.POST['id'])
    comment = Comment(author=request.user, post=post, comment=request.POST['comment'])
    comment.full_clean()
    comment.save()
    comments = post.comments.all()
    commets_serial = CommentSerializer(comments, many=True)
    return Response(commets_serial.data)


@api_view(['POST'])
@login_required
@parser_classes([JSONParser])
def delete_post(request):
    post = Post.objects.get(pk=request.data['id'])
    if post.author != request.user:
        return Response(status=status.HTTP_403_FORBIDDEN)
    post.delete()
    return Response(status=status.HTTP_201_CREATED)


@api_view(['POST'])
@login_required
@parser_classes([JSONParser])
def follow(request):
    user_to_follow = User.objects.get(pk=request.data['id'])
    subscription = Subscription(author=request.user, following=user_to_follow)
    try:
        subscription.save()
        following = True
    except IntegrityError as e:
        subscription = request.user.following.get(following=user_to_follow)
        subscription.delete()
        following = False
    return Response({'is_following': following}, status=status.HTTP_201_CREATED)

@api_view(['GET'])
@login_required
@parser_classes([JSONParser])
def index(request):
    following = request.user.following.all()
    if following:
        following_users = (sub.following for sub in following)
        posts = Post.objects.filter(author__in=following_users)
    else:
        posts = Post.objects.all()
    try:
        page = paginate(request, posts)
    except EmptyPage:
        return Response(status=status.HTTP_404_NOT_FOUND)
    response_data = []
    for post in page.object_list:
        serializer = PostSerializer(post)
        is_liked = True if request.user.post_likes.filter(post=post) else False
        is_owner = True if post.author == request.user else False
        response_data.append(
            {'post': serializer.data, 'is_liked': is_liked, 'is_owner': is_owner}
        )
    return Response(response_data)