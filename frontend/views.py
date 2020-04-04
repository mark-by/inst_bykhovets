from django.http import HttpResponse
import os
from technoinst.settings import BASE_DIR

def index(request):
    data = open(os.path.join(BASE_DIR, 'frontend/build/index.html'), 'r').read()
    return HttpResponse(data)

