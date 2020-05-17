from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
import django.core.exceptions as exceptions
from leads.models import User, Post, Tag, Like
from leads.forms import EditProfileName
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import api_view, parser_classes
from rest_framework.parsers import JSONParser, MultiPartParser, FormParser
from rest_framework.response import Response
from django.db.utils import IntegrityError
from .serializers import UserSerializer, SettingsUserSerializer, ShortUserSerializer, ShortPostSerializer, \
    PostSerializer, SignUpUserSerializer


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
def user_home(request):
    if 'id' in request.GET:
        user_id = request.GET['id']
    else:
        user_id = request.user.id
    try:
        founded_user = User.objects.get(pk=user_id)
        serializer = UserSerializer(founded_user)
        return Response(serializer.data)
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
            return Response({'post': serializer.data, 'is_liked': is_liked})
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
        return Response(status=status.HTTP_400_BAD_REQUEST)
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
