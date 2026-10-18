# Monte Rocella — Production Docker image
# Deployed to Render (Web Service, Docker runtime)

FROM php:8.3-fpm-alpine AS base

# System deps
RUN apk add --no-cache \
    nginx \
    nodejs \
    npm \
    supervisor \
    libpng-dev \
    libzip-dev \
    oniguruma-dev \
    && docker-php-ext-install pdo_mysql mbstring zip gd opcache

# Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

# ─── PHP deps ───────────────────────────────────────────────────────────────
FROM base AS php-deps
COPY composer.json composer.lock ./
RUN composer install \
    --no-interaction \
    --no-dev \
    --prefer-dist \
    --optimize-autoloader \
    --no-scripts

# ─── JS build ───────────────────────────────────────────────────────────────
FROM base AS js-build
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
COPY --from=php-deps /var/www/html/vendor ./vendor
ARG VITE_BOOKING_ENGINE=guesty
RUN npm run build

# ─── Final image ────────────────────────────────────────────────────────────
FROM base AS final

COPY --from=php-deps /var/www/html/vendor ./vendor
COPY . .
COPY --from=js-build /var/www/html/public/build ./public/build

RUN php artisan config:cache \
    && php artisan route:cache \
    && php artisan view:cache \
    && php artisan event:cache

# Nginx config
COPY docker/nginx.conf /etc/nginx/nginx.conf

# Supervisor config (nginx + php-fpm + inertia SSR)
COPY docker/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

RUN chmod -R 775 storage bootstrap/cache \
    && chown -R www-data:www-data storage bootstrap/cache

EXPOSE 8080

CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]
