FROM httpd:2.4.29-alpine

COPY ./config/apache2.conf /usr/local/apache2/conf/httpd.conf
COPY ./dist/ /usr/local/apache2/htdocs/
