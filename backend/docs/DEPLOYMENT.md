# Guía de Despliegue - Blog Interactivo Backend

## 📋 Información del Proyecto

- **Proyecto**: Blog Interactivo Backend
- **Materia**: Arquitectura Web
- **Stack**: Node.js + Express + MongoDB Atlas
- **Desarrollador**: 

## 🎯 Requisitos Previos

### Sistema Operativo
- **Windows**: 10/11 (64-bit)
- **macOS**: 10.15+ (Catalina o superior)
- **Linux**: Ubuntu 18.04+ / CentOS 7+ / Debian 9+

### Software Requerido
- **Node.js**: Versión 16.0.0 o superior
- **npm**: Versión 7.0.0 o superior (incluido con Node.js)
- **Git**: Para clonar el repositorio
- **MongoDB Atlas**: Cuenta gratuita

### Herramientas Opcionales
- **MongoDB Compass**: Para gestión visual de la base de datos
- **Postman**: Para testing de la API
- **VS Code**: Editor recomendado

## 🚀 Instalación Local

### 1. Clonar el Repositorio
```bash
# Clonar el repositorio
git clone [URL_DEL_REPOSITORIO]
cd arq-web-tp/backend

# Verificar estructura
ls -la
```

### 2. Instalar Dependencias
```bash
# Instalar dependencias de Node.js
npm install

# Verificar instalación
npm list --depth=0
```

### 3. Configurar Variables de Entorno
```bash
# Copiar archivo de ejemplo
cp env.example .env

# Editar configuración
# Windows
notepad .env

# macOS/Linux
nano .env
```

**Contenido del archivo `.env`:**
```env
# Configuración del servidor
PORT=3000
NODE_ENV=development

# Configuración de MongoDB Atlas
MONGODB_URI=mongodb+srv://arqweb_blog_user:N9dXRUfKEDpqbCgT@clusternews.pzw8mah.mongodb.net/blog_interactivo?retryWrites=true&w=majority&appName=ClusterNews

# Configuración de CORS
CORS_ORIGIN=http://localhost:3001

# Configuración adicional
API_VERSION=v1
```

### 4. Configurar MongoDB Atlas

#### Crear Cuenta en MongoDB Atlas
1. Ir a [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Crear cuenta gratuita
3. Crear cluster M0 Sandbox (gratuito)

#### Configurar Acceso de Red
1. **Network Access** → **Add IP Address**
2. Seleccionar **Allow access from anywhere** (0.0.0.0/0)
3. Confirmar configuración

#### Crear Usuario de Base de Datos
1. **Database Access** → **Add New Database User**
2. **Username**: `arqweb_blog_user`
3. **Password**: Generar contraseña segura
4. **Database User Privileges**: Read and write to any database
5. **Add User**

#### Obtener Connection String
1. **Clusters** → **Connect** → **Connect your application**
2. **Driver**: Node.js
3. **Version**: 4.1 or later
4. Copiar la URI de conexión

### 5. Poblar Base de Datos (Opcional)
```bash
# Ejecutar script de datos de prueba
node seedData.js

# Verificar datos insertados
# Deberías ver: ✅ 5 artículos insertados, ✅ 5 comentarios insertados
```

### 6. Iniciar Servidor
```bash
# Modo desarrollo (con nodemon)
npm run dev

# Modo producción
npm start

# Verificar que el servidor está funcionando
# Deberías ver: 🚀 Servidor iniciado exitosamente
```

### 7. Verificar Instalación
```bash
# Probar endpoint de salud
curl http://localhost:3000/health

# Probar endpoint de artículos
curl http://localhost:3000/api/articles

# Probar en navegador
# http://localhost:3000/health
# http://localhost:3000/api/articles
```

## 🌐 Despliegue en Producción

### Opción 1: Render.com (Recomendado - Usado en este proyecto)

#### Preparar Aplicación para Render

Render.com utiliza el archivo `render.yaml` en la raíz del proyecto para configurar el despliegue automático.

**Archivo render.yaml** (ya incluido en el proyecto):
```yaml
services:
  - type: web
    name: portal-de-noticias-backend
    env: node
    region: oregon
    plan: free
    buildCommand: |
      echo "📦 Instalando dependencias del frontend..."
      cd frontend-tp-arq-web-main
      npm install
      echo "🔨 Compilando frontend..."
      npm run build
      cd ..
      echo "📦 Instalando dependencias del backend..."
      cd backend
      npm install
    startCommand: cd backend && npm start
    rootDir: .
    envVars:
      - key: NODE_ENV
        value: production
      - key: PORT
        value: 10000
      - key: MONGODB_URI
        sync: false
      - key: CORS_ORIGIN
        sync: false
      - key: API_VERSION
        value: v1
      - key: JWT_SECRET
        sync: false
      - key: JWT_EXPIRES_IN
        value: 7d
      - key: JWT_ISSUER
        value: blog-api
      - key: JWT_AUDIENCE
        value: blog-users
    healthCheckPath: /health
```

#### Desplegar en Render.com

**Método 1: Blueprint (Recomendado)**

1. **Crear cuenta en Render.com**:
   - Ir a [Render.com](https://render.com)
   - Crear cuenta gratuita
   - Conectar cuenta de GitHub/GitLab

2. **Desplegar desde Blueprint**:
   - Ir a [Render Dashboard > Blueprints](https://dashboard.render.com/blueprints)
   - Click en **"New Blueprint"**
   - Pegar la URL de tu repositorio Git
   - Render detectará automáticamente el archivo `render.yaml`
   - Click en **"Apply"**

3. **Configurar Variables de Entorno**:
   En el Dashboard de Render, ir a tu servicio y configurar las siguientes variables:
   
   ```env
   MONGODB_URI=mongodb+srv://arqweb_blog_user:PASSWORD@clusternews.pzw8mah.mongodb.net/blog_interactivo?retryWrites=true&w=majority&appName=ClusterNews
   
   CORS_ORIGIN=https://tu-frontend.vercel.app
   
   JWT_SECRET=tu-secreto-jwt-muy-seguro-y-largo-minimo-32-caracteres
   ```

   **Generar JWT_SECRET seguro**:
   ```bash
   # En terminal
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

4. **Verificar Despliegue**:
   - Render construirá automáticamente la aplicación
   - El servicio estará disponible en: `https://tu-app.onrender.com`
   - Verificar endpoint de salud: `https://tu-app.onrender.com/health`

**Método 2: Despliegue Manual**

1. **Crear Nuevo Web Service**:
   - Ir a [Render Dashboard](https://dashboard.render.com)
   - Click en **"New +"** → **"Web Service"**
   - Conectar repositorio Git
   - Seleccionar el repositorio del proyecto

2. **Configurar Servicio**:
   - **Name**: `portal-de-noticias-backend`
   - **Environment**: `Node`
   - **Region**: `Oregon` (o la región más cercana)
   - **Branch**: `main` (o tu rama principal)
   - **Root Directory**: `.` (raíz del proyecto)
   - **Build Command**: 
     ```bash
     cd frontend-tp-arq-web-main && npm install && npm run build && cd .. && cd backend && npm install
     ```
   - **Start Command**: `cd backend && npm start`
   - **Plan**: `Free` (para desarrollo) o `Starter` (para producción)

3. **Configurar Variables de Entorno**:
   - Ir a la sección **"Environment"** del servicio
   - Agregar las siguientes variables:
     - `NODE_ENV`: `production`
     - `PORT`: `10000` (Render asigna el puerto automáticamente, pero puedes especificar 10000)
     - `MONGODB_URI`: Tu URI de MongoDB Atlas
     - `CORS_ORIGIN`: URL de tu frontend
     - `JWT_SECRET`: Secreto seguro para JWT
     - `JWT_EXPIRES_IN`: `7d`
     - `JWT_ISSUER`: `blog-api`
     - `JWT_AUDIENCE`: `blog-users`
     - `API_VERSION`: `v1`

4. **Desplegar**:
   - Click en **"Create Web Service"**
   - Render construirá y desplegará automáticamente
   - El servicio estará disponible cuando el build termine

#### Configurar MongoDB Atlas para Render

1. **Network Access**:
   - Ir a MongoDB Atlas → **Network Access**
   - Agregar IP de Render: `0.0.0.0/0` (permite acceso desde cualquier IP)
   - O mejor: Agregar IPs específicas de Render si están disponibles

2. **Database Access**:
   - Verificar que el usuario `arqweb_blog_user` tiene permisos
   - Verificar que la contraseña es correcta

#### Características de Render.com

- ✅ **Deploy automático**: Actualiza automáticamente con cada push a Git
- ✅ **HTTPS gratuito**: Certificado SSL automático
- ✅ **Health checks**: Monitoreo automático del endpoint `/health`
- ✅ **Logs en tiempo real**: Acceso a logs desde el dashboard
- ✅ **Plan gratuito**: Perfecto para desarrollo y proyectos pequeños
- ✅ **Custom domains**: Posibilidad de agregar dominio personalizado

#### URLs del Proyecto en Render

- **Backend**: `https://portal-de-noticias-r4yi.onrender.com`
- **Health Check**: `https://portal-de-noticias-r4yi.onrender.com/health`
- **API Docs**: `https://portal-de-noticias-r4yi.onrender.com/api-docs`

#### Troubleshooting en Render

**Problema: Build falla**
```bash
# Verificar logs en Render Dashboard
# Verificar que todas las dependencias están en package.json
# Verificar que el buildCommand está correcto
```

**Problema: Aplicación no inicia**
```bash
# Verificar que el startCommand es correcto
# Verificar que el PORT está configurado
# Verificar variables de entorno
```

**Problema: Error de conexión a MongoDB**
```bash
# Verificar MONGODB_URI en variables de entorno
# Verificar Network Access en MongoDB Atlas
# Verificar credenciales
```



### Buenas Prácticas
- **Variables de entorno**: Nunca commitear credenciales
- **HTTPS**: Siempre usar en producción
- **Rate limiting**: Implementar límites de tráfico
- **Logging**: Registrar eventos importantes
- **Updates**: Mantener dependencias actualizadas

---

**Desarrollado para Arquitectura Web - TP Blog Interactivo**
