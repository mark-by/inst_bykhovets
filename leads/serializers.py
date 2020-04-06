from rest_framework import serializers
from leads.models import User


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('username', 'last_login', 'description', 'name', 'avatar', 'followers_count', 'following_count', 'post_count')


class SettingsUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'description', 'name', 'avatar')
