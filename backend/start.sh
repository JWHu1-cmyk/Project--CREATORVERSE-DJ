#!/bin/bash
set -e

# Run migrations
python manage.py migrate

# Start Gunicorn
gunicorn backend.wsgi:application