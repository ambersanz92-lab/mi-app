#!/bin/bash

git pull

cd frontend
npm install
npm run build
cp -r build/* /home/ssm-user/app/frontend/

cd ../backend
pm2 restart server

echo "Deploy completo 🚀"
