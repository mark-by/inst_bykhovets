import string
import re

def get_hashtags(text):
    check_symbols = string.punctuation.replace('#', '')
    text = text.lower()
    for c in check_symbols:
        if c in text:
            text = text.replace(c, '')
    return {tag.strip('#') for tag in re.findall(r'[#@][^\s#@]+', text)}