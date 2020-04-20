FROM nginx:latest

COPY dist/dualis-rework /usr/share/nginx/html
COPY nginx-anular.conf /etc/nginx/conf.d/defualt.conf
