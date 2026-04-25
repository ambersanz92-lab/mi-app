#!/bin/bash

cd "$(dirname "$0")"

echo "🚀 Deploy iniciando..."

git pull origin main || echo "⚠️ Sin cambios remotos aún"

echo "📦 Build frontend..."
cd frontend || exit
npm install
npm run build

echo "📁 Copiando a Nginx..."
cp -r build/* /home/ssm-user/app/frontend/

echo "🔁 Reiniciando backend..."
cd ../backend || exit
pm2 restart server || pm2 start server.js --name server

echo "✅ Deploy completo"
