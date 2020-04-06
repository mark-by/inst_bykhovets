from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
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
    avatar = models.ImageField(upload_to=f"users_media/{username}/", blank=True, null=True)

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
        return self.email + " : " + self.username

    def has_perm(self, perm, obj=None):
        return self.is_admin

    def has_module_perms(self, app_label):
        return True


class Comment(models.Model):
    author = models.ForeignKey(User, related_name='comments', on_delete=models.CASCADE)
    comment = models.TextField(max_length=512)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.comment)[:30]


def path_for_posts(instance, filename):
    return f'posts/%Y/%m/{instance.pk}_{filename.lower().replace(" ", "_")}'


class Post(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='post')
    content = models.ImageField(upload_to=path_for_posts)
    description = models.TextField(max_length=512, blank=True, null=True, default=None)
    create_at = models.DateTimeField(auto_now_add=True)

    def get_total_likes(self):
        return self.likes.users.count()

    def __str__(self):
        return str(self.description)[:30]


class Like(models.Model):
    post = models.OneToOneField(Post, related_name="likes", on_delete=models.CASCADE)
    users = models.ManyToManyField(User, related_name='post_likes')
    created_at = models.DateTimeField(auto_now_add=True)


class Subscription(models.Model):
    author = models.ForeignKey(User, related_name="following", on_delete=models.CASCADE)
    followers = models.ManyToManyField(User, related_name="followers")
    created_at = models.DateTimeField(auto_now_add=True)
