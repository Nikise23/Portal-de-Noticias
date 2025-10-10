# Configuración Docker - Blog Interactivo Backend

## 📁 Archivos de Docker

Esta carpeta contiene toda la configuración de Docker para el backend.

### 📋 Archivos Disponibles

- **Dockerfile**: Imagen de la aplicación (copia en raíz)
- **docker-compose.yml**: Configuración de producción
- **docker-compose.dev.yml**: Configuración de desarrollo
- **.dockerignore**: Archivos a ignorar en build

## 🚀 Uso Rápido

### Desarrollo
```bash
# Ejecutar en modo desarrollo
docker-compose -f docker/docker-compose.dev.yml up

# Ejecutar en background
docker-compose -f docker/docker-compose.dev.yml up -d
```

### Producción
```bash
# Ejecutar en modo producción
docker-compose -f docker/docker-compose.yml up -d

# Ver logs
docker-compose -f docker/docker-compose.yml logs -f
```

## 🔧 Configuraciones

### docker-compose.yml (Producción)
- **Entorno**: production
- **Comando**: npm start
- **Volúmenes**: Solo código fuente
- **Health check**: Incluido

### docker-compose.dev.yml (Desarrollo)
- **Entorno**: development
- **Comando**: npm run dev
- **Volúmenes**: Código fuente + node_modules
- **Hot reload**: Habilitado

## 📊 Servicios

### Backend
- **Puerto**: 3000
- **Imagen**: Construida desde Dockerfile
- **Variables**: Desde archivo .env

### MongoDB (Opcional)
- **Puerto**: 27017
- **Imagen**: mongo:5.0
- **Volúmenes**: Persistencia de datos

## 🔍 Comandos Útiles

```bash
# Ver estado de servicios
docker-compose -f docker/docker-compose.yml ps

# Ver logs en tiempo real
docker-compose -f docker/docker-compose.yml logs -f backend

# Ejecutar comando en contenedor
docker-compose -f docker/docker-compose.yml exec backend npm run seed

# Detener servicios
docker-compose -f docker/docker-compose.yml down

# Reconstruir imagen
docker-compose -f docker/docker-compose.yml build --no-cache
```

## 🚨 Troubleshooting

### Problemas Comunes
- **Puerto ocupado**: Cambiar puerto en docker-compose.yml
- **Error de build**: Verificar Dockerfile y dependencias
- **Conexión DB**: Verificar variables de entorno

### Logs y Debugging
```bash
# Ver logs detallados
docker-compose -f docker/docker-compose.yml logs --tail=100 -f

# Ejecutar shell en contenedor
docker-compose -f docker/docker-compose.yml exec backend sh

# Verificar variables de entorno
docker-compose -f docker/docker-compose.yml exec backend env
```

## 📈 Escalabilidad

### Escalado Horizontal
```bash
# Escalar servicio
docker-compose -f docker/docker-compose.yml up -d --scale backend=3
```

### Escalado Vertical
```yaml
# En docker-compose.yml
services:
  backend:
    deploy:
      resources:
        limits:
          cpus: '1.0'
          memory: 512M
```

## 🔒 Seguridad

### Buenas Prácticas
- **Usuario no-root**: Configurado en Dockerfile
- **Imágenes oficiales**: node:16-alpine
- **Volúmenes**: Solo datos necesarios
- **Redes**: Aislamiento por defecto

---

**Desarrollado para Arquitectura Web - TP Blog Interactivo**
