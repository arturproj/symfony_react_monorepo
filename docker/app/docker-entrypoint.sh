#!/bin/sh
set -e

# Esegue le migrazioni Doctrine solo se DATABASE_URL è definita
if [ -n "$DATABASE_URL" ]; then
    echo "Applying database migrations..."
    php bin/console doctrine:migrations:migrate --no-interaction --allow-no-migration
fi

# Warmup cache (idempotente, utile se non già fatto in build)
php bin/console cache:warmup --env=prod || true

exec "$@"