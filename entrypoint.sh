#!/bin/sh

# ถ้า PORT ไม่มีให้ใช้ 8000
PORT=${PORT:-8000}

echo "Starting PHP built-in server on port $PORT..."
php -S 0.0.0.0:$PORT -t public
