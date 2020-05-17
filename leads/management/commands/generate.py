from django.core.management.base import BaseCommand, CommandError
from leads.models import User, Post, Comment
import faker

images = ['227-512x512.jpg', '70-512x512.jpg', '368-512x512.jpg', '14-512x512.jpg', '983-512x512.jpg',
          '618-512x512.jpg', '565-512x512.jpg', '415-512x512.jpg', '1070-512x512.jpg', '36-512x512.jpg',
          '135-512x512.jpg', '89-512x512.jpg', '912-512x512.jpg', '324-512x512.jpg', '803-512x512.jpg',
          '682-512x512.jpg', '805-512x512.jpg', '443-512x512.jpg', '628-512x512.jpg', '716-512x512 (1).jpg',
          '100-512x512.jpg', '83-512x512.jpg', '787-512x512.jpg', '377-512x512.jpg', '447-512x512.jpg',
          '604-512x512.jpg', '349-512x512.jpg', '908-512x512.jpg', '211-512x512.jpg', '829-512x512.jpg',
          '217-512x512.jpg', '651-512x512.jpg', '1064-512x512.jpg', '471-512x512.jpg', '643-512x512.jpg',
          '775-512x512.jpg', '1012-512x512.jpg', '5-512x512.jpg', '326-512x512.jpg', '619-512x512.jpg',
          '225-512x512.jpg', '803-512x512 (1).jpg', '213-512x512.jpg', '716-512x512.jpg', '994-512x512.jpg',
          '77-512x512.jpg', '606-512x512.jpg', '721-512x512.jpg', '674-512x512.jpg', '862-512x512.jpg']

faker = faker.Faker()


def text_with_tags():
    return faker.text() + ' '.join(['#' + faker.word() for i in range(7)])


class Command(BaseCommand):
    help = 'fill data'

    def handle(self, *args, **options):
        # try:
        #     for i in range(1000):
        #         users = [User(username=f"user__{i}_{user}", password="1", email=faker.email(), name=faker.name(),
        #                       description=faker.text()) for user in range(1000)]
        #         User.objects.bulk_create(users, ignore_conflicts=True)
        #         print(f"Progress: {(i/1000)*100}%")
        # except:
        #     pass

        # for idx, user in enumerate(User.objects.all()):
        #     posts = [Post(author=user, description=text_with_tags(), content=faker.random.choice(images)) for post
        #          in range(10)]
        #     Post.objects.bulk_create(posts)
        #     print(f"Progress: {(idx/User.objects.count())*100}%")

        i = 0
        for user in User.objects.all()[0:10]:
            for post in Post.objects.all()[0:100]:
                comment = Comment(author=user, post=post, comment=faker.text())
                comment.save()
                i += 1
                print(f"Progress: {(i/1000)*100}%")
