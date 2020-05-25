import string
import re
from django.core.paginator import Paginator, EmptyPage
from django.http import Http404


class ShortUser(object):
    def __init__(self, username, id, avatar):
        self.username = username
        self.id = id
        self.avatar = avatar


def get_hashtags(text):
    check_symbols = string.punctuation.replace('#', '')
    text = text.lower()
    for c in check_symbols:
        if c in text:
            text = text.replace(c, '')
    return {tag.strip('#') for tag in re.findall(r'[#@][^\s#@]+', text)}


def paginate(request, qs):
    try:
        limit = int(request.GET.get('limit', 7))
    except ValueError:
        limit = 7
    if limit > 100:
        limit = 7
    try:
        page = int(request.GET.get('page', 1))
    except ValueError:
        raise Http404
    paginator = Paginator(qs, limit)
    page = paginator.page(page)
    return page
