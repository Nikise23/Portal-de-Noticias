# Documentación del Backend - Blog Interactivo

## 📁 Estructura de Documentación

Esta carpeta contiene toda la documentación técnica del backend del Blog Interactivo.

### 📋 Archivos Disponibles

- **[ARCHITECTURE.md](./ARCHITECTURE.md)**: Arquitectura del sistema y decisiones técnicas
- **[API.md](./API.md)**: Documentación detallada de endpoints y ejemplos de uso
- **[SWAGGER.md](./SWAGGER.md)**: Guía completa de Swagger/OpenAPI
- **[DEPLOYMENT.md](./DEPLOYMENT.md)**: Guía de despliegue y configuración (incluye Render.com)
- **[DIAGRAMS.md](./DIAGRAMS.md)**: Diagramas de arquitectura y base de datos

## 🎯 Propósito

Esta documentación está diseñada para:

- **Desarrolladores**: Entender la arquitectura y usar la API
- **DevOps**: Desplegar y mantener la aplicación
- **Evaluadores**: Comprender las decisiones técnicas del proyecto
- **Colaboradores**: Integrar el frontend con el backend
- **Usuarios de la API**: Comprender cómo consumir los endpoints

## 📚 Cómo Usar Esta Documentación

### Para Desarrolladores

1. **Comienza con [ARCHITECTURE.md](./ARCHITECTURE.md)** para entender el sistema y las decisiones técnicas
2. **Revisa [API.md](./API.md)** para conocer todos los endpoints disponibles con ejemplos
3. **Usa Swagger UI** en `/api-docs` para documentación interactiva y pruebas en vivo
4. **Consulta [SWAGGER.md](./SWAGGER.md)** para detalles técnicos de Swagger
5. **Revisa [DIAGRAMS.md](./DIAGRAMS.md)** para visualizar la arquitectura y relaciones

### Para Despliegue

1. **Lee [DEPLOYMENT.md](./DEPLOYMENT.md)** para opciones de despliegue
   - **Render.com** (Recomendado - Usado en producción)
   - Docker, Heroku, Vercel, DigitalOcean, AWS EC2
2. **Configuración de variables de entorno** paso a paso
3. **Verificación post-despliegue** y troubleshooting

### Para Integración Frontend

1. **Revisa [API.md](./API.md)** para endpoints disponibles
2. **Consulta ejemplos de uso** con JavaScript/Fetch, Axios, cURL
3. **Verifica códigos de estado** y manejo de errores
4. **Autenticación JWT**: Guía completa de registro, login y uso de tokens
5. **Manejo de imágenes**: URLs externas para imágenes de artículos

## 🔧 Tecnologías Documentadas

- **Node.js + Express**: Framework web y servidor
- **MongoDB Atlas**: Base de datos NoSQL en la nube
- **Mongoose**: ODM para MongoDB
- **JWT (JSON Web Tokens)**: Autenticación y autorización
- **Bcrypt**: Hash de contraseñas
- **Swagger/OpenAPI**: Documentación interactiva de API
- **REST API**: Arquitectura de servicios RESTful

## 🌐 Información del Proyecto

- **URL de Producción**: `https://portal-de-noticias-r4yi.onrender.com`
- **Health Check**: `https://portal-de-noticias-r4yi.onrender.com/health`
- **API Docs**: `https://portal-de-noticias-r4yi.onrender.com/api-docs`
- **Plataforma de Despliegue**: Render.com

## 🔑 Características Principales

- ✅ **Sistema de Autenticación Completo**: Registro, login, JWT tokens
- ✅ **Gestión de Artículos**: CRUD completo con búsqueda y filtros
- ✅ **Sistema de Comentarios**: Comentarios anidados y likes
- ✅ **Búsqueda de Texto**: Búsqueda full-text en MongoDB
- ✅ **Paginación**: En todas las consultas
- ✅ **Validación**: Schema validation con Mongoose
- ✅ **Manejo de Imágenes**: URLs externas para imágenes de artículos

## 📖 Convenciones

- **Endpoints**: Documentados con ejemplos completos (cURL, JavaScript, Axios)
- **Códigos de estado**: HTTP status codes explicados detalladamente
- **Errores**: Manejo centralizado documentado con formatos de respuesta
- **Validaciones**: Reglas de negocio especificadas para cada endpoint
- **Autenticación**: JWT tokens con ejemplos de uso
- **URLs**: Formato estándar RESTful

## 🚀 Inicio Rápido

### Para Desarrolladores

```bash
# Clonar repositorio
git clone [URL_DEL_REPOSITORIO]
cd Portal-de-Noticias/backend

# Instalar dependencias
npm install

# Configurar variables de entorno
cp env.example .env
# Editar .env con tus credenciales

# Iniciar servidor
npm run dev
```

### Para Consumir la API

```bash
# Verificar salud del servidor
curl https://portal-de-noticias-r4yi.onrender.com/health

# Obtener artículos
curl https://portal-de-noticias-r4yi.onrender.com/api/articles

# Ver documentación interactiva
# Abrir: https://portal-de-noticias-r4yi.onrender.com/api-docs
```

## 📞 Endpoints Principales

- **Artículos**: `GET /api/articles`, `GET /api/articles/:slug`
- **Búsqueda**: `GET /api/articles/search`
- **Comentarios**: `GET /api/articles/:slug/comments`, `POST /api/articles/:slug/comments`
- **Autenticación**: `POST /api/auth/register`, `POST /api/auth/login`
- **Sistema**: `GET /health`, `GET /api-docs`

Para más detalles, consulta [API.md](./API.md).

---

**Desarrollado para Arquitectura Web - TP Blog Interactivo**
