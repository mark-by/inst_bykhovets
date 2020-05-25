#!/bin/bash
source /home/mark/by-mark.ru/env/bin/activate
exec gunicorn -c "/home/mark/by-mark.ru/technoinst/gunicorn_config.py"
