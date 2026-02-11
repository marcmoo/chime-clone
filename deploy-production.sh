#!/bin/bash
set -e

# Chime Clone Frontend — Production Deployment Script
# Server: 193.46.198.236
# Path: /var/www/chime-clone

SERVER="root@193.46.198.236"
REMOTE_DIR="/var/www/chime-clone"
PM2_APP="chime-web"
GRAPHQL_URL="http://193.46.198.236/chime/graphql"

echo "=== Chime Clone Frontend — Production Deploy ==="

# Step 1: SSH into server, pull latest code, install & build
echo "[1/3] Deploying to server..."
ssh $SERVER << ENDSSH
  cd $REMOTE_DIR

  echo "  Pulling latest code..."
  git pull origin main

  echo "  Installing dependencies..."
  npm install

  echo "  Building with production GraphQL URL..."
  NEXT_PUBLIC_GRAPHQL_URL=$GRAPHQL_URL npm run build
ENDSSH

# Step 2: Restart PM2
echo "[2/3] Restarting PM2..."
ssh $SERVER << ENDSSH
  cd $REMOTE_DIR
  pm2 delete $PM2_APP 2>/dev/null || true
  pm2 start npm --name $PM2_APP -- start -- -p 3001
  pm2 save
ENDSSH

# Step 3: Health check
echo "[3/3] Running health check..."
sleep 3
RESPONSE=$(ssh $SERVER "curl -s -o /dev/null -w '%{http_code}' http://localhost:3001")

if [ "$RESPONSE" = "200" ]; then
  echo "Deploy successful! Frontend is responding (HTTP $RESPONSE)"
else
  echo "WARNING: Frontend returned HTTP $RESPONSE. Check logs with: ssh $SERVER 'pm2 logs $PM2_APP --lines 20'"
fi

echo "=== Done ==="
