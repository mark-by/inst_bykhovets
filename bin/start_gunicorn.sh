#!/bin/bash
source /home/mark/by-mark.ru/env/bin/activate
exec gunicorn -c "/home/mark/by-mark.ru/gunicorn_config.py" technoinst.wsgi
