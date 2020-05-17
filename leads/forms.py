from django.forms import ModelForm
from leads.models import User

class EditProfileName(ModelForm):
    class Meta:
        model = User
        fields = ['name', 'username', 'description', 'email', 'gender']
