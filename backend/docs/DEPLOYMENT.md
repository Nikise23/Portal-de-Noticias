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

### Opción 1: Docker (Recomendado para desarrollo y producción)

#### Preparar Aplicación para Docker
```bash
# Crear Dockerfile
cat > Dockerfile << EOF
# Usar imagen oficial de Node.js
FROM node:16-alpine

# Establecer directorio de trabajo
WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm ci --only=production

# Copiar código fuente
COPY . .

# Crear usuario no-root para seguridad
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001

# Cambiar propiedad de archivos
RUN chown -R nodejs:nodejs /app
USER nodejs

# Exponer puerto
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "start"]
EOF

# Crear .dockerignore
cat > .dockerignore << EOF
node_modules
npm-debug.log
.env
.env.local
.env.development.local
.env.test.local
.env.production.local
.git
.gitignore
README.md
Dockerfile
.dockerignore
EOF
```

#### Desplegar con Docker Compose
```bash
# Crear docker-compose.yml
cat > docker-compose.yml << EOF
version: '3.8'

services:
  backend:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - PORT=3000
      - MONGODB_URI=mongodb+srv://arqweb_blog_user:PASSWORD@clusternews.pzw8mah.mongodb.net/blog_interactivo
      - CORS_ORIGIN=https://tu-frontend.vercel.app
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s

  # Opcional: MongoDB local para desarrollo
  mongodb:
    image: mongo:5.0
    ports:
      - "27017:27017"
    environment:
      - MONGO_INITDB_ROOT_USERNAME=admin
      - MONGO_INITDB_ROOT_PASSWORD=password
    volumes:
      - mongodb_data:/data/db
    restart: unless-stopped

volumes:
  mongodb_data:
EOF

# Construir y ejecutar
docker-compose up -d

# Verificar que está funcionando
docker-compose ps
docker-compose logs backend
```

#### Desplegar en Docker Hub
```bash
# Construir imagen
docker build -t tu-usuario/blog-backend .

# Etiquetar para Docker Hub
docker tag tu-usuario/blog-backend:latest tu-usuario/blog-backend:v1.0.0

# Subir a Docker Hub
docker push tu-usuario/blog-backend:latest
docker push tu-usuario/blog-backend:v1.0.0

# En el servidor de producción
docker pull tu-usuario/blog-backend:latest
docker run -d \
  --name blog-backend \
  -p 3000:3000 \
  -e NODE_ENV=production \
  -e MONGODB_URI=mongodb+srv://... \
  -e CORS_ORIGIN=https://... \
  --restart unless-stopped \
  tu-usuario/blog-backend:latest
```

#### Desplegar en Kubernetes
```bash
# Crear deployment.yaml
cat > deployment.yaml << EOF
apiVersion: apps/v1
kind: Deployment
metadata:
  name: blog-backend
  labels:
    app: blog-backend
spec:
  replicas: 3
  selector:
    matchLabels:
      app: blog-backend
  template:
    metadata:
      labels:
        app: blog-backend
    spec:
      containers:
      - name: blog-backend
        image: tu-usuario/blog-backend:latest
        ports:
        - containerPort: 3000
        env:
        - name: NODE_ENV
          value: "production"
        - name: MONGODB_URI
          valueFrom:
            secretKeyRef:
              name: blog-secrets
              key: mongodb-uri
        - name: CORS_ORIGIN
          value: "https://tu-frontend.vercel.app"
        livenessProbe:
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 5
          periodSeconds: 5
---
apiVersion: v1
kind: Service
metadata:
  name: blog-backend-service
spec:
  selector:
    app: blog-backend
  ports:
    - protocol: TCP
      port: 80
      targetPort: 3000
  type: LoadBalancer
EOF

# Aplicar configuración
kubectl apply -f deployment.yaml

# Verificar despliegue
kubectl get pods
kubectl get services
```

#### Desplegar en AWS ECS
```bash
# Crear task-definition.json
cat > task-definition.json << EOF
{
  "family": "blog-backend",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "256",
  "memory": "512",
  "executionRoleArn": "arn:aws:iam::ACCOUNT:role/ecsTaskExecutionRole",
  "taskRoleArn": "arn:aws:iam::ACCOUNT:role/ecsTaskRole",
  "containerDefinitions": [
    {
      "name": "blog-backend",
      "image": "tu-usuario/blog-backend:latest",
      "portMappings": [
        {
          "containerPort": 3000,
          "protocol": "tcp"
        }
      ],
      "environment": [
        {
          "name": "NODE_ENV",
          "value": "production"
        },
        {
          "name": "CORS_ORIGIN",
          "value": "https://tu-frontend.vercel.app"
        }
      ],
      "secrets": [
        {
          "name": "MONGODB_URI",
          "valueFrom": "arn:aws:secretsmanager:region:account:secret:blog/mongodb"
        }
      ],
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/blog-backend",
          "awslogs-region": "us-east-1",
          "awslogs-stream-prefix": "ecs"
        }
      }
    }
  ]
}
EOF

# Registrar task definition
aws ecs register-task-definition --cli-input-json file://task-definition.json

# Crear servicio
aws ecs create-service \
  --cluster blog-cluster \
  --service-name blog-backend-service \
  --task-definition blog-backend \
  --desired-count 2 \
  --launch-type FARGATE \
  --network-configuration "awsvpcConfiguration={subnets=[subnet-12345],securityGroups=[sg-12345],assignPublicIp=ENABLED}"
```

### Opción 2: Heroku (Recomendado para simplicidad)

#### Preparar Aplicación
```bash
# Crear archivo Procfile
echo "web: node server.js" > Procfile

# Crear archivo .gitignore
echo "node_modules
.env
*.log
.DS_Store" > .gitignore

# Inicializar repositorio Git
git init
git add .
git commit -m "Initial commit"
```

#### Desplegar en Heroku
```bash
# Instalar Heroku CLI
# https://devcenter.heroku.com/articles/heroku-cli

# Login en Heroku
heroku login

# Crear aplicación
heroku create blog-interactivo-backend

# Configurar variables de entorno
heroku config:set NODE_ENV=production
heroku config:set MONGODB_URI=mongodb+srv://arqweb_blog_user:PASSWORD@clusternews.pzw8mah.mongodb.net/blog_interactivo
heroku config:set CORS_ORIGIN=https://tu-frontend.herokuapp.com

# Desplegar
git push heroku main

# Verificar despliegue
heroku open
```

#### Configurar MongoDB Atlas para Producción
1. **Network Access**: Agregar IP de Heroku
2. **Database Access**: Verificar usuario
3. **Connection String**: Usar URI de producción

### Opción 2: Vercel

#### Preparar Aplicación
```bash
# Crear archivo vercel.json
cat > vercel.json << EOF
{
  "version": 2,
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "server.js"
    }
  ]
}
EOF
```

#### Desplegar en Vercel
```bash
# Instalar Vercel CLI
npm install -g vercel

# Login en Vercel
vercel login

# Desplegar
vercel

# Configurar variables de entorno
vercel env add MONGODB_URI
vercel env add NODE_ENV
vercel env add CORS_ORIGIN
```

### Opción 3: DigitalOcean App Platform

#### Preparar Aplicación
```bash
# Crear archivo .do/app.yaml
mkdir -p .do
cat > .do/app.yaml << EOF
name: blog-interactivo-backend
services:
- name: api
  source_dir: /backend
  github:
    repo: tu-usuario/arq-web-tp
    branch: main
  run_command: npm start
  environment_slug: node-js
  instance_count: 1
  instance_size_slug: basic-xxs
  envs:
  - key: NODE_ENV
    value: production
  - key: MONGODB_URI
    value: mongodb+srv://arqweb_blog_user:PASSWORD@clusternews.pzw8mah.mongodb.net/blog_interactivo
  - key: CORS_ORIGIN
    value: https://tu-frontend.vercel.app
EOF
```

#### Desplegar en DigitalOcean
1. Conectar repositorio GitHub
2. Configurar variables de entorno
3. Desplegar aplicación

### Opción 4: AWS EC2

#### Configurar Instancia EC2
```bash
# Conectar a instancia EC2
ssh -i "tu-key.pem" ec2-user@tu-ip

# Actualizar sistema
sudo yum update -y

# Instalar Node.js
curl -fsSL https://rpm.nodesource.com/setup_16.x | sudo bash -
sudo yum install -y nodejs

# Instalar PM2 para gestión de procesos
sudo npm install -g pm2

# Clonar repositorio
git clone [URL_DEL_REPOSITORIO]
cd arq-web-tp/backend

# Instalar dependencias
npm install --production

# Configurar variables de entorno
cp env.example .env
nano .env
```

#### Configurar PM2
```bash
# Crear archivo ecosystem.config.js
cat > ecosystem.config.js << EOF
module.exports = {
  apps: [{
    name: 'blog-backend',
    script: 'server.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
}
EOF

# Iniciar aplicación con PM2
pm2 start ecosystem.config.js

# Configurar PM2 para iniciar automáticamente
pm2 startup
pm2 save
```

#### Configurar Nginx (Opcional)
```bash
# Instalar Nginx
sudo yum install -y nginx

# Configurar proxy reverso
sudo nano /etc/nginx/conf.d/blog-backend.conf
```

**Contenido del archivo de configuración:**
```nginx
server {
    listen 80;
    server_name tu-dominio.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Iniciar Nginx
sudo systemctl start nginx
sudo systemctl enable nginx
```

## 🔧 Configuración de Producción

### Variables de Entorno de Producción
```env
# Configuración del servidor
PORT=3000
NODE_ENV=production

# Configuración de MongoDB Atlas
MONGODB_URI=mongodb+srv://arqweb_blog_user:PASSWORD@clusternews.pzw8mah.mongodb.net/blog_interactivo?retryWrites=true&w=majority&appName=ClusterNews

# Configuración de CORS
CORS_ORIGIN=https://tu-frontend.vercel.app

# Configuración adicional
API_VERSION=v1
```

### Optimizaciones de Producción
```javascript
// En server.js - agregar middleware de compresión
const compression = require('compression');
app.use(compression());

// Configurar rate limiting
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100 // máximo 100 requests por IP
});
app.use('/api/', limiter);

// Configurar helmet para seguridad
const helmet = require('helmet');
app.use(helmet());
```

### Logging en Producción
```javascript
// Configurar logging con winston
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

// En producción, también loggear en consola
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}
```

## 🔍 Verificación Post-Despliegue

### 1. Verificar Servidor
```bash
# Probar endpoint de salud
curl https://tu-app.herokuapp.com/health

# Probar endpoint de artículos
curl https://tu-app.herokuapp.com/api/articles

# Verificar logs
heroku logs --tail
```

### 2. Verificar Base de Datos
```bash
# Conectar a MongoDB Compass con URI de producción
# Verificar que los datos están disponibles
# Probar operaciones CRUD
```

### 3. Verificar CORS
```bash
# Probar desde frontend
# Verificar que no hay errores de CORS
# Probar peticiones desde diferentes dominios
```

### 4. Verificar Rendimiento
```bash
# Usar herramientas como:
# - Lighthouse
# - GTmetrix
# - WebPageTest

# Verificar métricas:
# - Tiempo de respuesta < 200ms
# - Disponibilidad > 99%
# - Throughput > 100 req/s
```

## 🚨 Troubleshooting

### Problemas Comunes

#### Error de Conexión a MongoDB
```bash
# Verificar URI de conexión
echo $MONGODB_URI

# Verificar credenciales
# Verificar acceso de red en MongoDB Atlas
# Verificar que el cluster está activo
```

#### Error de CORS
```bash
# Verificar configuración de CORS_ORIGIN
# Verificar que el frontend está en el dominio correcto
# Verificar headers de respuesta
```

#### Error de Puerto
```bash
# Verificar que el puerto está disponible
# Verificar configuración de PORT
# Verificar que no hay conflictos
```

#### Error de Dependencias
```bash
# Limpiar caché de npm
npm cache clean --force

# Reinstalar dependencias
rm -rf node_modules package-lock.json
npm install
```

### Logs y Monitoreo
```bash
# Ver logs en tiempo real
heroku logs --tail

# Ver logs específicos
heroku logs --source app

# Ver métricas
heroku metrics
```

## 📊 Monitoreo y Mantenimiento

### Métricas Clave
- **Uptime**: > 99.9%
- **Response Time**: < 200ms
- **Error Rate**: < 1%
- **Throughput**: > 100 req/s

### Alertas Recomendadas
- **Error Rate**: > 5%
- **Response Time**: > 500ms
- **Memory Usage**: > 80%
- **CPU Usage**: > 80%

### Tareas de Mantenimiento
- **Backup**: Automático en MongoDB Atlas
- **Updates**: Dependencias npm mensuales
- **Logs**: Rotación semanal
- **Security**: Revisión trimestral

## 🔒 Seguridad en Producción

### Configuraciones de Seguridad
```javascript
// Configurar HTTPS
app.use((req, res, next) => {
  if (req.header('x-forwarded-proto') !== 'https') {
    res.redirect(`https://${req.header('host')}${req.url}`);
  } else {
    next();
  }
});

// Configurar headers de seguridad
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));
```

### Buenas Prácticas
- **Variables de entorno**: Nunca commitear credenciales
- **HTTPS**: Siempre usar en producción
- **Rate limiting**: Implementar límites de tráfico
- **Logging**: Registrar eventos importantes
- **Updates**: Mantener dependencias actualizadas

---

**Desarrollado para Arquitectura Web - TP Blog Interactivo**
