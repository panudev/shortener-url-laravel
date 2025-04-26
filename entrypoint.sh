#!/bin/sh

PORT=${PORT:-8000}
PORT=$(expr $PORT + 0) # บังคับ cast เป็น integer

php artisan serve --host=0.0.0.0 --port=$PORT
