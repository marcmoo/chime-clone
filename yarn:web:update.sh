#!/bin/bash
cd /var/www/chime-clone && git pull && npm run build && pm2 restart chime-web
