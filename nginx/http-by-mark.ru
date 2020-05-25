server {
    listen 80;
    server_name by-mark.ru www.by-mark.ru *.by-mark.ru;
    
    return 301 https://$server_name$request_uri;
}
