#!/bin/bash

# Script de build para Render.com
# Este script compila el frontend y prepara el backend

echo "🚀 Iniciando build del proyecto..."

# Compilar frontend
echo "📦 Compilando frontend..."
cd frontend-tp-arq-web-main
npm install
npm run build
cd ..

echo "✅ Build completado!"
echo "📁 Frontend compilado en: frontend-tp-arq-web-main/dist"

