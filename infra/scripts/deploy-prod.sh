#!/usr/bin/env bash
set -e

echo "Starting production deploy..."

# Pull latest code (if running on a git-based server)
if [ -d ".git" ]; then
  git pull origin main
fi

# Build or pull images
echo "Using docker-compose.prod.yml to start services..."
docker compose -f infra/docker-compose.prod.yml pull || true
docker compose -f infra/docker-compose.prod.yml up -d --build

echo "Running database migrations (if defined)..."
if [ -f "infra/scripts/migrate-db.sh" ]; then
  bash infra/scripts/migrate-db.sh
fi

echo "Deployment complete."
