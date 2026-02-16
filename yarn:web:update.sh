#!/bin/bash
cd /var/www/bukiping-clone && git pull && npm run build && pm2 restart bukiping-web
