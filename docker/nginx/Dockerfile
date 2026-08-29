# syntax=docker/dockerfile:1

FROM nginx:1.27-alpine

# Rimuove la config di default e copia la nostra
RUN rm /etc/nginx/conf.d/default.conf
COPY docker/nginx/default.conf /etc/nginx/conf.d/default.conf

# Nginx serve solo file statici e proxya PHP-FPM: la cartella public/ viene
# condivisa a runtime tramite volume dal container "app" (vedi docker-compose.yml)

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]