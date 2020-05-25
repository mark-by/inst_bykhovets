from rest_framework import serializers
from leads.models import User, Post, Comment, Subscription


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'username', 'last_login', 'description', 'name', 'avatar', 'followers_count', 'following_count',
            'post_count', 'id')


class SettingsUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'description', 'name', 'avatar', 'gender', 'is_active')


class SignUpUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'name', 'password')


class ShortUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'avatar', 'id')


class ShortUserSerializerForList(serializers.Serializer):
    username = serializers.CharField(max_length=60)
    id = serializers.IntegerField()
    avatar = serializers.ImageField()


class CommentSerializer(serializers.ModelSerializer):
    author = ShortUserSerializer(many=False)

    class Meta:
        model = Comment
        fields = ('author', 'comment', 'created_at')


class PostSerializer(serializers.ModelSerializer):
    comments = CommentSerializer(many=True)
    author = ShortUserSerializer(many=False)

    class Meta:
        model = Post
        fields = ('id', 'author', 'content', 'description', 'create_at', 'tags', 'total_likes', 'comments')


class ShortPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ('id', 'content')
