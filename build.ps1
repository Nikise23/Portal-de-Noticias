# Script de build para Windows (PowerShell)
# Este script compila el frontend y prepara el backend

Write-Host "Iniciando build del proyecto..." -ForegroundColor Cyan

# Compilar frontend
Write-Host "Compilando frontend..." -ForegroundColor Yellow
Push-Location frontend-tp-arq-web-main

npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Error al instalar dependencias del frontend" -ForegroundColor Red
    Pop-Location
    exit 1
}

npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Error al compilar el frontend" -ForegroundColor Red
    Pop-Location
    exit 1
}

Pop-Location

Write-Host "Build completado exitosamente!" -ForegroundColor Green
Write-Host "Frontend compilado en: frontend-tp-arq-web-main/dist" -ForegroundColor Green

