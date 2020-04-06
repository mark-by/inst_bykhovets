from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
import django.core.exceptions as exceptions
from leads.models import User
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import api_view, parser_classes
from rest_framework.parsers import JSONParser, MultiPartParser, FormParser
from rest_framework.response import Response
from .serializers import UserSerializer, SettingsUserSerializer, ShortUserSerializer


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
        return Response(status=status.HTTP_200_OK)
    else:
        return Response(status=status.HTTP_403_FORBIDDEN)


@api_view(['POST'])
@parser_classes([MultiPartParser])
def log_out(request):
    logout(request)
    return Response(status=status.HTTP_200_OK)


@api_view(['POST'])
@parser_classes([MultiPartParser])
def register(request):
    email = request.POST['email']
    username = request.POST['username']
    name = request.POST['name']
    password = request.POST['password']
    User.objects.create_user(email, username, name, password)
    user = authenticate(request, username=username, password=password)
    login(request, user)
    return Response(status=status.HTTP_201_CREATED)


@api_view(['GET'])
@login_required
def user_home(request):
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
    user = User.objects.get(pk=request.user.id)
    if request.method == 'GET':
        serializer = SettingsUserSerializer(user)
        return Response(serializer.data)
    elif request.method == 'POST':
        user.username = request.POST['username']
        user.avatar = request.FILES['avatar']
        print(user.avatar)
        user.name = request.POST['name']
        user.description = request.POST['description']
        user.email = request.POST['email']
        user.gender = request.POST['gender']
        user.is_active = False if request.POST['disable'] == "1" else True
        try:
            user.full_clean()
            user.save()
            return Response(status=status.HTTP_201_CREATED)
        except exceptions.ValidationError as e:
            print(e)
            return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
@login_required
@parser_classes(MultiPartParser)
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
