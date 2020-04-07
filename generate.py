from leads.models import User, Post
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


for i in range(1500):
    try:
        username = faker.user_name()
        User.objects.create_user(username=username, password=username, email=faker.email(), name=faker.name(),
                                 description=faker.text())
    except:
        pass

for user in User.objects.all():
    for i in range(7):
        description = text_with_tags()
        Post(author=user, description=description, content=faker.random.choice(images)).save()
