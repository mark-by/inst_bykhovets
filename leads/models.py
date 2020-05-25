from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from datetime import datetime
from .utils import get_hashtags
import django.core.exceptions as exceptions


class UserManager(BaseUserManager):
    def create_user(self, email, username, name, password=None, description=None):
        if not email:
            raise ValueError("Users must have an email address")
        if not username:
            raise ValueError("Users must have an username")
        if not name:
            raise ValueError("Users must have an name")

        user = self.model(
            email=self.normalize_email(email),
            name=name,
            password=password,
            username=username,
            description=description
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, username, name, password):
        user = self.create_user(
            email=self.normalize_email(email),
            name=name,
            password=password,
            username=username
        )
        user.is_admin = True
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user


def path_for_user_data(instance, file_name):
    return f"users_data/{instance.id}_avatar"


class User(AbstractBaseUser):
    username = models.CharField(max_length=32, unique=True)
    email = models.EmailField(max_length=60, unique=True)
    date_joined = models.DateField(verbose_name="date joinde", auto_now_add=True)
    last_login = models.DateTimeField(verbose_name="last login", auto_now=True)
    is_admin = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    name = models.CharField(max_length=128)
    description = models.TextField(max_length=256, blank=True, default="", null=True)
    gender = models.CharField(max_length=1, choices=[('m', 'Male'),
                                                     ('f', 'Female'),
                                                     ('o', 'Other'),
                                                     ('p', 'Prefer not to say')], default='p')
    rating = models.PositiveIntegerField(default=0)
    avatar = models.ImageField(upload_to=path_for_user_data, blank=True, null=True)

    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = ["email", "name"]

    objects = UserManager()

    @property
    def following_count(self):
        return self.following.count()

    @property
    def followers_count(self):
        return self.followers.count()

    @property
    def post_count(self):
        return self.post.count()

    def __str__(self):
        return self.username

    def has_perm(self, perm, obj=None):
        return self.is_admin

    def has_module_perms(self, app_label):
        return True

    class Meta:
        ordering = ['-date_joined']


class Comment(models.Model):
    author = models.ForeignKey(User, related_name='comments', on_delete=models.CASCADE)
    post = models.ForeignKey('Post', related_name='comments', on_delete=models.CASCADE)
    comment = models.TextField(max_length=512)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.comment)[:30]

    class Meta:
        ordering = ['-created_at']


class Tag(models.Model):
    title = models.CharField(max_length=64, unique=True)

    def __str__(self):
        return self.title


def path_for_posts(instance, filename):
    now = str(datetime.now()).replace(' ', '_').replace('.', '_').split('-')
    return f'posts/{now[0]}/{now[1]}/{now[2]}_{filename.lower().replace(" ", "_")}'


class Post(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='post')
    content = models.ImageField(upload_to=path_for_posts)
    description = models.TextField(max_length=512, blank=True, null=True, default=None)
    create_at = models.DateTimeField(auto_now_add=True)
    tags = models.ManyToManyField(Tag, related_name='posts', blank=True)

    @property
    def total_likes(self):
        return self.likes.count()

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        tags = get_hashtags(self.description)
        tags_objects = [Tag(title=tag) for tag in tags]
        for tag in tags_objects:
            try:
                tag.full_clean()
                tag.save()
            except exceptions.ValidationError:
                try:
                    tag = Tag.objects.get(title=tag.title)
                    tag.save()
                    tag.posts.add(self)
                except:
                    pass
        try:
            self.tags.set(tags_objects)
        except:
            pass

    def __str__(self):
        return str(self.description)[:30]

    class Meta:
        ordering = ['-create_at']


class Like(models.Model):
    post = models.ForeignKey(Post, related_name="likes", on_delete=models.CASCADE)
    user = models.ForeignKey(User, related_name='post_likes', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'post')


class Subscription(models.Model):
    author = models.ForeignKey(User, related_name="following", on_delete=models.CASCADE)
    following = models.ForeignKey(User, related_name="followers", on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        if self.author != self.following:
            super().save(*args, **kwargs)

    class Meta:
        unique_together = ('author', 'following')
