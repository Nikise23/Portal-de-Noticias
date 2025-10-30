# Guía de Docker - Blog Interactivo Backend

## 📋 Información del Proyecto

- **Proyecto**: Blog Interactivo Backend
- **Materia**: Arquitectura Web
- **Stack**: Node.js + Express + MongoDB Atlas
- **Desarrollador**: 
- **Containerización**: Docker + Docker Compose

## 🐳 ¿Por qué Docker?

### Ventajas de usar Docker
- **Consistencia**: Mismo entorno en desarrollo y producción
- **Portabilidad**: Funciona en cualquier sistema operativo
- **Aislamiento**: Dependencias encapsuladas
- **Escalabilidad**: Fácil escalado horizontal
- **Despliegue**: Simplifica el proceso de despliegue

### Casos de uso
- **Desarrollo local**: Entorno consistente para todos los desarrolladores
- **CI/CD**: Testing automatizado en pipelines
- **Producción**: Despliegue en cualquier plataforma cloud
- **Microservicios**: Arquitectura distribuida

## 🚀 Instalación y Configuración

### Requisitos Previos
- **Docker**: Versión 20.10+ 
- **Docker Compose**: Versión 2.0+
- **Git**: Para clonar el repositorio

### Verificar Instalación
```bash
# Verificar Docker
docker --version
docker-compose --version

# Verificar que Docker está funcionando
docker run hello-world
```

## 📁 Estructura de Archivos Docker

```
backend/
├── Dockerfile              # Imagen de la aplicación
├── .dockerignore           # Archivos a ignorar en build
├── docker-compose.yml      # Configuración de producción
├── docker-compose.dev.yml  # Configuración de desarrollo
├── mongo-init.js          # Script de inicialización de MongoDB
└── DOCKER.md              # Esta documentación
```

## 🔧 Configuración de Docker

### Dockerfile
```dockerfile
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
```

### .dockerignore
```
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
*.log
.DS_Store
coverage/
.nyc_output/
```

## 🏗️ Docker Compose

### Producción (docker-compose.yml)
```yaml
version: '3.8'

services:
  backend:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - PORT=3000
      - MONGODB_URI=mongodb+srv://arqweb_blog_user:N9dXRUfKEDpqbCgT@clusternews.pzw8mah.mongodb.net/blog_interactivo?retryWrites=true&w=majority&appName=ClusterNews
      - CORS_ORIGIN=http://localhost:3001
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "wget", "--no-verbose", "--tries=1", "--spider", "http://localhost:3000/health"]
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
```

### Desarrollo (docker-compose.dev.yml)
```yaml
version: '3.8'

services:
  backend:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=development
      - PORT=3000
      - MONGODB_URI=mongodb+srv://arqweb_blog_user:N9dXRUfKEDpqbCgT@clusternews.pzw8mah.mongodb.net/blog_interactivo?retryWrites=true&w=majority&appName=ClusterNews
      - CORS_ORIGIN=http://localhost:3001
    volumes:
      # Montar código fuente para desarrollo en vivo
      - .:/app
      - /app/node_modules
    restart: unless-stopped
    command: npm run dev
    healthcheck:
      test: ["CMD", "wget", "--no-verbose", "--tries=1", "--spider", "http://localhost:3000/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s

  # MongoDB local para desarrollo
  mongodb:
    image: mongo:5.0
    ports:
      - "27017:27017"
    environment:
      - MONGO_INITDB_ROOT_USERNAME=admin
      - MONGO_INITDB_ROOT_PASSWORD=password
      - MONGO_INITDB_DATABASE=blog_interactivo
    volumes:
      - mongodb_data:/data/db
      - ./mongo-init.js:/docker-entrypoint-initdb.d/mongo-init.js:ro
    restart: unless-stopped

volumes:
  mongodb_data:
```

## 🚀 Comandos de Docker

### Comandos Básicos
```bash
# Construir imagen
docker build -t blog-backend .

# Ejecutar contenedor
docker run -d -p 3000:3000 --name blog-backend blog-backend

# Ver logs
docker logs blog-backend

# Detener contenedor
docker stop blog-backend

# Eliminar contenedor
docker rm blog-backend

# Eliminar imagen
docker rmi blog-backend
```

### Comandos de Docker Compose
```bash
# Construir y ejecutar en background
docker-compose up -d

# Ejecutar en primer plano
docker-compose up

# Detener servicios
docker-compose down

# Reconstruir imagen
docker-compose build --no-cache

# Ver logs
docker-compose logs -f

# Ver estado de servicios
docker-compose ps

# Ejecutar comando en contenedor
docker-compose exec backend npm run seed
```

### Comandos de Desarrollo
```bash
# Ejecutar en modo desarrollo
docker-compose -f docker-compose.dev.yml up

# Ejecutar en background
docker-compose -f docker-compose.dev.yml up -d

# Ver logs de desarrollo
docker-compose -f docker-compose.dev.yml logs -f backend

# Detener desarrollo
docker-compose -f docker-compose.dev.yml down
```

## 🔍 Verificación y Testing

### Verificar que Docker está funcionando
```bash
# Verificar contenedores
docker ps

# Verificar imágenes
docker images

# Verificar volúmenes
docker volume ls

# Verificar redes
docker network ls
```

### Testing de la Aplicación
```bash
# Probar endpoint de salud
curl http://localhost:3000/health

# Probar endpoint de artículos
curl http://localhost:3000/api/articles

# Probar desde navegador
# http://localhost:3000/health
# http://localhost:3000/api/articles
```

### Verificar Base de Datos
```bash
# Conectar a MongoDB local
docker-compose exec mongodb mongo

# Verificar conexión desde aplicación
docker-compose exec backend node -e "console.log('MongoDB connection test')"
```

## 🚀 Despliegue con Docker

### Docker Hub
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

### Kubernetes
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

### AWS ECS
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

## 🔧 Optimizaciones de Docker

### Multi-stage Build
```dockerfile
# Stage 1: Build
FROM node:16-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Production
FROM node:16-alpine AS production
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/public ./public
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001
RUN chown -R nodejs:nodejs /app
USER nodejs
EXPOSE 3000
CMD ["npm", "start"]
```

### Optimización de Imagen
```dockerfile
# Usar imagen más pequeña
FROM node:16-alpine

# Instalar solo dependencias de producción
RUN npm ci --only=production && npm cache clean --force

# Usar usuario no-root
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Configurar permisos
RUN chown -R nodejs:nodejs /app
USER nodejs

# Exponer puerto
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/health || exit 1
```

## 🚨 Troubleshooting

### Problemas Comunes

#### Error de Build
```bash
# Limpiar caché de Docker
docker system prune -a

# Reconstruir sin caché
docker build --no-cache -t blog-backend .

# Verificar Dockerfile
docker build --progress=plain -t blog-backend .
```

#### Error de Conexión
```bash
# Verificar redes de Docker
docker network ls

# Inspeccionar red
docker network inspect backend_default

# Conectar contenedor a red
docker network connect backend_default blog-backend
```

#### Error de Volúmenes
```bash
# Verificar volúmenes
docker volume ls

# Inspeccionar volumen
docker volume inspect backend_mongodb_data

# Eliminar volumen
docker volume rm backend_mongodb_data
```

#### Error de Puertos
```bash
# Verificar puertos en uso
docker port blog-backend

# Cambiar puerto en docker-compose.yml
ports:
  - "3001:3000"  # Puerto externo:interno
```

### Logs y Debugging
```bash
# Ver logs detallados
docker-compose logs --tail=100 -f

# Ver logs de un servicio específico
docker-compose logs backend

# Ejecutar shell en contenedor
docker-compose exec backend sh

# Verificar variables de entorno
docker-compose exec backend env

# Verificar procesos
docker-compose exec backend ps aux
```

## 📊 Monitoreo y Métricas

### Health Checks
```yaml
healthcheck:
  test: ["CMD", "wget", "--no-verbose", "--tries=1", "--spider", "http://localhost:3000/health"]
  interval: 30s
  timeout: 10s
  retries: 3
  start_period: 40s
```

### Métricas de Docker
```bash
# Ver estadísticas de contenedores
docker stats

# Ver uso de recursos
docker system df

# Ver información del sistema
docker system info
```

### Logging
```yaml
logging:
  driver: "json-file"
  options:
    max-size: "10m"
    max-file: "3"
```

## 🔒 Seguridad

### Buenas Prácticas
- **Usuario no-root**: Ejecutar aplicación como usuario no-privilegiado
- **Imágenes oficiales**: Usar imágenes oficiales de Docker Hub
- **Actualizaciones**: Mantener imágenes actualizadas
- **Secrets**: Usar Docker secrets para información sensible
- **Network**: Usar redes personalizadas para aislamiento

### Configuración de Seguridad
```yaml
# docker-compose.yml
services:
  backend:
    security_opt:
      - no-new-privileges:true
    read_only: true
    tmpfs:
      - /tmp
      - /var/cache/nginx
    cap_drop:
      - ALL
    cap_add:
      - CHOWN
      - SETGID
      - SETUID
```

## 📈 Escalabilidad

### Escalado Horizontal
```bash
# Escalar servicio
docker-compose up -d --scale backend=3

# Verificar réplicas
docker-compose ps

# Balanceador de carga
# Usar nginx o traefik para distribuir tráfico
```

### Escalado Vertical
```yaml
# docker-compose.yml
services:
  backend:
    deploy:
      resources:
        limits:
          cpus: '1.0'
          memory: 512M
        reservations:
          cpus: '0.5'
          memory: 256M
```

---

**Desarrollado para Arquitectura Web - TP Blog Interactivo**


