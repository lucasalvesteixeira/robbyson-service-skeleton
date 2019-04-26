#!/bin/sh
export VERSION
cd /opt/{{dir service}}
npm install --silent -qq
npm run build
npm run swagger
chmod 757 -R dist
export ROBBYSON_API_HOST
export SQL_ROBBYSON_SERVER
export SQL_ROBBYSON_PORT
export SQL_ROBBYSON_USER
export SQL_ROBBYSON_PASS
export SQL_ROBBYSON_DATABASE
export TZ
export DEBUG_MODE
./dist/bin/www.debug.js

# while [[ true ]]; do
#     sleep 2
# done