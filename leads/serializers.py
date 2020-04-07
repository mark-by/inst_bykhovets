from rest_framework import serializers
from leads.models import User, Post


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'username', 'last_login', 'description', 'name', 'avatar', 'followers_count', 'following_count',
            'post_count')


class SettingsUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'description', 'name', 'avatar', 'gender')


class ShortUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'avatar')


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'


class ShortPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ('id', 'content')
