# syntax=docker/dockerfile:1

##############################
# Stage 1 — Build asset front-end (Webpack Encore)
##############################
FROM node:24.12-alpine AS frontend_builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY webpack.config.mjs ./
COPY assets ./assets

RUN npm run build


##############################
# Stage 2 — Installazione dipendenze PHP (Composer)
##############################
FROM composer:2.10 AS php_deps

WORKDIR /app

COPY composer.json composer.lock ./

RUN composer install \
    --no-dev \
    --no-scripts \
    --no-autoloader \
    --no-progress \
    --prefer-dist

RUN composer require symfony/runtime


##############################
# Stage 3 — Immagine finale PHP-FPM
##############################
FROM php:8.4-fpm-alpine AS app

# Estensioni PHP per Symfony — adatta pdo_pgsql/pdo_mysql in base al tuo DB
RUN apk add --no-cache \
        icu-dev \
        libzip-dev \
        oniguruma-dev \
        postgresql-dev \
    && docker-php-ext-install -j$(nproc) \
        intl \
        opcache \
        pdo \
        pdo_pgsql \
        zip \
    && apk del --no-cache postgresql-dev icu-dev libzip-dev oniguruma-dev \
    && apk add --no-cache libpq icu libzip oniguruma

# OPcache raccomandato per produzione
RUN { \
        echo 'opcache.memory_consumption=256'; \
        echo 'opcache.max_accelerated_files=20000'; \
        echo 'opcache.validate_timestamps=0'; \
        echo 'opcache.enable_cli=1'; \
    } > /usr/local/etc/php/conf.d/opcache-recommended.ini

# php.ini di produzione come base
RUN mv "$PHP_INI_DIR/php.ini-production" "$PHP_INI_DIR/php.ini"

WORKDIR /var/www/html

COPY . .

# Dipendenze PHP dallo stage 2
COPY --from=php_deps /app/vendor ./vendor

# Asset compilati dal frontend builder
COPY --from=frontend_builder /app/public/build ./public/build

RUN composer dump-autoload --optimize --classmap-authoritative --no-dev \
    && composer run-script post-install-cmd --no-dev || true

RUN chown -R www-data:www-data var public

COPY docker/app/docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

USER www-data

EXPOSE 9000

ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["php-fpm"]