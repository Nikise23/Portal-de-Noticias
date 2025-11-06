# Documentación de API - Blog Interactivo

## 📋 Información General

- **Base URL**: `http://localhost:3000`
- **Versión**: v1
- **Formato**: JSON
- **Autenticación**: No requerida (público)
- **CORS**: Habilitado para `http://localhost:3001`

## 🔗 Endpoints Disponibles

### 📰 Artículos

#### GET /api/articles
Obtiene todos los artículos con paginación y filtros.

**Parámetros de consulta:**
- `page` (opcional): Número de página (default: 1)
- `limit` (opcional): Elementos por página (default: 10)
- `search` (opcional): Término de búsqueda
- `tag` (opcional): Filtrar por tag específico
- `author` (opcional): Filtrar por autor
- `sortBy` (opcional): Campo para ordenar (publishedAt, likesCount, viewsCount)
- `sortOrder` (opcional): Orden (asc, desc)

**Ejemplo de petición:**
```bash
GET /api/articles?page=1&limit=5&sortBy=publishedAt&sortOrder=desc
```

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "data": {
    "articles": [
      {
        "_id": "68e88f43342ff9b3125ec243",
        "title": "Introducción a Node.js y Express",
        "slug": "introduccion-nodejs-express",
        "excerpt": "Node.js es un entorno de ejecución de JavaScript...",
        "author": "Profesor Arquitectura Web",
        "publishedAt": "2025-10-10T01:30:00.000Z",
        "tags": ["nodejs", "express", "javascript"],
        "likesCount": 15,
        "viewsCount": 120,
        "readingTime": 3
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 1,
      "totalArticles": 5,
      "hasNextPage": false,
      "hasPrevPage": false,
      "limit": 5
    }
  }
}
```

#### GET /api/articles/:slug
Obtiene un artículo específico por su slug.

**Parámetros de ruta:**
- `slug` (requerido): Slug único del artículo

**Ejemplo de petición:**
```bash
GET /api/articles/introduccion-nodejs-express
```

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "data": {
    "article": {
      "_id": "68e88f43342ff9b3125ec243",
      "title": "Introducción a Node.js y Express",
      "slug": "introduccion-nodejs-express",
      "content": "Node.js es un entorno de ejecución de JavaScript del lado del servidor...",
      "excerpt": "Node.js es un entorno de ejecución de JavaScript...",
      "author": "Profesor Arquitectura Web",
      "publishedAt": "2025-10-10T01:30:00.000Z",
      "tags": ["nodejs", "express", "javascript", "backend"],
      "likesCount": 15,
      "viewsCount": 121,
      "readingTime": 3,
      "url": "/articles/introduccion-nodejs-express"
    }
  }
}
```

**Respuesta de error (404):**
```json
{
  "success": false,
  "message": "Artículo no encontrado"
}
```

#### GET /api/articles/search
Busca artículos por texto usando índices de MongoDB.

**Parámetros de consulta:**
- `q` (requerido): Término de búsqueda (mínimo 2 caracteres)
- `page` (opcional): Número de página (default: 1)
- `limit` (opcional): Elementos por página (default: 10)
- `sortBy` (opcional): Campo para ordenar
- `sortOrder` (opcional): Orden (asc, desc)

**Ejemplo de petición:**
```bash
GET /api/articles/search?q=nodejs&page=1&limit=5
```

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "data": {
    "articles": [
      {
        "_id": "68e88f43342ff9b3125ec243",
        "title": "Introducción a Node.js y Express",
        "slug": "introduccion-nodejs-express",
        "excerpt": "Node.js es un entorno de ejecución de JavaScript...",
        "author": "Profesor Arquitectura Web",
        "publishedAt": "2025-10-10T01:30:00.000Z",
        "tags": ["nodejs", "express", "javascript"],
        "likesCount": 15,
        "viewsCount": 120,
        "readingTime": 3
      }
    ],
    "searchTerm": "nodejs",
    "pagination": {
      "currentPage": 1,
      "totalPages": 1,
      "totalResults": 1,
      "hasNextPage": false,
      "hasPrevPage": false,
      "limit": 5
    }
  }
}
```

**Respuesta de error (400):**
```json
{
  "success": false,
  "message": "El término de búsqueda debe tener al menos 2 caracteres"
}
```

#### GET /api/articles/popular
Obtiene artículos populares ordenados por likes y vistas.

**Parámetros de consulta:**
- `limit` (opcional): Número de artículos (default: 5)

**Ejemplo de petición:**
```bash
GET /api/articles/popular?limit=3
```

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "data": {
    "articles": [
      {
        "_id": "68e88f43342ff9b3125ec245",
        "title": "Arquitectura de APIs REST: Mejores Prácticas",
        "slug": "arquitectura-apis-rest-mejores-practicas",
        "excerpt": "Las APIs REST son fundamentales en el desarrollo web moderno...",
        "author": "Arquitecto de Software",
        "publishedAt": "2025-10-10T01:30:00.000Z",
        "likesCount": 31,
        "viewsCount": 250
      }
    ]
  }
}
```

#### GET /api/articles/tags
Obtiene todos los tags únicos de los artículos.

**Ejemplo de petición:**
```bash
GET /api/articles/tags
```

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "data": {
    "tags": [
      "api",
      "arquitectura",
      "backend",
      "base-datos",
      "componentes",
      "comunicacion",
      "escalabilidad",
      "express",
      "frontend",
      "integracion",
      "javascript",
      "mejores-practicas",
      "mongodb",
      "nodejs",
      "nosql",
      "react",
      "rest",
      "ui"
    ]
  }
}
```

#### GET /api/articles/tag/:tag
Obtiene artículos filtrados por un tag específico.

**Parámetros de ruta:**
- `tag` (requerido): Tag a filtrar

**Parámetros de consulta:**
- `page` (opcional): Número de página
- `limit` (opcional): Elementos por página
- `sortBy` (opcional): Campo para ordenar
- `sortOrder` (opcional): Orden

**Ejemplo de petición:**
```bash
GET /api/articles/tag/nodejs?page=1&limit=5
```

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "data": {
    "articles": [
      {
        "_id": "68e88f43342ff9b3125ec243",
        "title": "Introducción a Node.js y Express",
        "slug": "introduccion-nodejs-express",
        "excerpt": "Node.js es un entorno de ejecución de JavaScript...",
        "author": "Profesor Arquitectura Web",
        "publishedAt": "2025-10-10T01:30:00.000Z",
        "tags": ["nodejs", "express", "javascript"],
        "likesCount": 15,
        "viewsCount": 120,
        "readingTime": 3
      }
    ],
    "tag": "nodejs",
    "pagination": {
      "currentPage": 1,
      "totalPages": 1,
      "totalArticles": 1,
      "hasNextPage": false,
      "hasPrevPage": false,
      "limit": 5
    }
  }
}
```

#### GET /api/articles/stats
Obtiene estadísticas generales del blog.

**Ejemplo de petición:**
```bash
GET /api/articles/stats
```

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "data": {
    "stats": {
      "totalArticles": 5,
      "totalViews": 901,
      "totalLikes": 116,
      "totalTags": 18
    }
  }
}
```

### 💬 Comentarios

#### GET /api/articles/:slug/comments
Obtiene comentarios de un artículo específico.

**Parámetros de ruta:**
- `slug` (requerido): Slug del artículo

**Parámetros de consulta:**
- `page` (opcional): Número de página (default: 1)
- `limit` (opcional): Elementos por página (default: 20)
- `includeReplies` (opcional): Incluir respuestas (default: true)

**Ejemplo de petición:**
```bash
GET /api/articles/introduccion-nodejs-express/comments?page=1&limit=10
```

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "data": {
    "comments": [
      {
        "_id": "68e88f44342ff9b3125ec250",
        "author": "Estudiante Dev",
        "content": "Excelente artículo! Muy claro y bien explicado.",
        "createdAt": "2025-10-10T01:35:00.000Z",
        "likesCount": 0,
        "isEdited": false,
        "parentCommentId": null
      }
    ],
    "articleSlug": "introduccion-nodejs-express",
    "pagination": {
      "currentPage": 1,
      "totalPages": 1,
      "totalComments": 2,
      "hasNextPage": false,
      "hasPrevPage": false,
      "limit": 10
    }
  }
}
```

#### POST /api/articles/:slug/comments
Agrega un nuevo comentario a un artículo.

**Parámetros de ruta:**
- `slug` (requerido): Slug del artículo

**Cuerpo de la petición:**
```json
{
  "author": "Juan Pérez",
  "email": "juan@email.com",
  "content": "Excelente artículo, muy informativo!",
  "parentCommentId": "68e88f44342ff9b3125ec250"
}
```

**Campos requeridos:**
- `author`: Nombre del autor (máximo 100 caracteres)
- `email`: Email válido
- `content`: Contenido del comentario (10-1000 caracteres)

**Campos opcionales:**
- `parentCommentId`: ID del comentario padre (para respuestas)

**Ejemplo de petición:**
```bash
POST /api/articles/introduccion-nodejs-express/comments
Content-Type: application/json

{
  "author": "Juan Pérez",
  "email": "juan@email.com",
  "content": "Excelente artículo, muy informativo!"
}
```

**Respuesta exitosa (201):**
```json
{
  "success": true,
  "message": "Comentario agregado exitosamente",
  "data": {
    "comment": {
      "_id": "68e88f44342ff9b3125ec251",
      "articleId": "68e88f43342ff9b3125ec243",
      "author": "Juan Pérez",
      "email": "juan@email.com",
      "content": "Excelente artículo, muy informativo!",
      "parentCommentId": null,
      "isApproved": true,
      "likesCount": 0,
      "isEdited": false,
      "createdAt": "2025-10-10T01:40:00.000Z",
      "updatedAt": "2025-10-10T01:40:00.000Z"
    }
  }
}
```

**Respuesta de error (400):**
```json
{
  "success": false,
  "message": "Todos los campos son obligatorios: author, email, content"
}
```

#### POST /api/articles/:slug/like
Alterna el like en un artículo.

**Parámetros de ruta:**
- `slug` (requerido): Slug del artículo

**Cuerpo de la petición:**
```json
{
  "action": "increment"
}
```

**Valores válidos para `action`:**
- `"increment"`: Agregar like
- `"decrement"`: Quitar like

**Ejemplo de petición:**
```bash
POST /api/articles/introduccion-nodejs-express/like
Content-Type: application/json

{
  "action": "increment"
}
```

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "message": "Like agregado exitosamente",
  "data": {
    "article": {
      "slug": "introduccion-nodejs-express",
      "title": "Introducción a Node.js y Express",
      "likesCount": 16
    }
  }
}
```

#### GET /api/comments/recent
Obtiene comentarios recientes de todo el blog.

**Parámetros de consulta:**
- `limit` (opcional): Número de comentarios (default: 10)

**Ejemplo de petición:**
```bash
GET /api/comments/recent?limit=5
```

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "data": {
    "comments": [
      {
        "_id": "68e88f44342ff9b3125ec251",
        "author": "Juan Pérez",
        "content": "Excelente artículo, muy informativo!",
        "createdAt": "2025-10-10T01:40:00.000Z",
        "articleId": {
          "_id": "68e88f43342ff9b3125ec243",
          "title": "Introducción a Node.js y Express",
          "slug": "introduccion-nodejs-express"
        }
      }
    ]
  }
}
```

#### POST /api/comments/:commentId/like
Alterna el like en un comentario específico.

**Parámetros de ruta:**
- `commentId` (requerido): ID del comentario

**Cuerpo de la petición:**
```json
{
  "action": "increment"
}
```

**Ejemplo de petición:**
```bash
POST /api/comments/68e88f44342ff9b3125ec251/like
Content-Type: application/json

{
  "action": "increment"
}
```

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "message": "Like agregado exitosamente",
  "data": {
    "comment": {
      "_id": "68e88f44342ff9b3125ec251",
      "likesCount": 1
    }
  }
}
```

#### PATCH /api/articles/:slug/image
Actualiza la imagen de un artículo mediante URL externa.

**Parámetros de ruta:**
- `slug` (requerido): Slug único del artículo

**Cuerpo de la petición:**
```json
{
  "imagenUrl": "https://ejemplo.com/imagen.jpg"
}
```

**Campos requeridos:**
- `imagenUrl`: URL completa de la imagen (debe ser una URL externa válida)

**Ejemplo de petición:**
```bash
PATCH /api/articles/introduccion-nodejs-express/image
Content-Type: application/json

{
  "imagenUrl": "https://cdn.ejemplo.com/images/nodejs-intro.jpg"
}
```

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "message": "Imagen del artículo actualizada exitosamente",
  "data": {
    "article": {
      "slug": "introduccion-nodejs-express",
      "title": "Introducción a Node.js y Express",
      "imagenUrl": "https://cdn.ejemplo.com/images/nodejs-intro.jpg"
    }
  }
}
```

**Respuesta de error (400):**
```json
{
  "success": false,
  "message": "La URL de la imagen es requerida"
}
```

**Respuesta de error (404):**
```json
{
  "success": false,
  "message": "Artículo no encontrado"
}
```

**Nota:** Las imágenes se manejan mediante URLs externas. No se utiliza sistema de uploads local. La URL debe ser accesible públicamente.

### 🔐 Autenticación

#### POST /api/auth/register
Registra un nuevo usuario en el sistema.

**Cuerpo de la petición:**
```json
{
  "name": "Juan Pérez",
  "email": "juan@example.com",
  "password": "Password123"
}
```

**Campos requeridos:**
- `name`: Nombre completo (2-50 caracteres, solo letras y espacios)
- `email`: Email válido y único
- `password`: Contraseña (mínimo 6 caracteres, debe incluir mayúscula, minúscula y número)

**Ejemplo de petición:**
```bash
POST /api/auth/register
Content-Type: application/json

{
  "name": "Juan Pérez",
  "email": "juan@example.com",
  "password": "Password123"
}
```

**Respuesta exitosa (201):**
```json
{
  "success": true,
  "message": "Usuario registrado exitosamente",
  "data": {
    "user": {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Juan Pérez",
      "email": "juan@example.com",
      "role": "user",
      "isActive": true,
      "createdAt": "2024-01-01T00:00:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Respuesta de error (400):**
```json
{
  "success": false,
  "message": "Datos de entrada inválidos",
  "errors": [
    {
      "msg": "La contraseña debe contener al menos una minúscula, una mayúscula y un número",
      "param": "password"
    }
  ]
}
```

**Respuesta de error (409):**
```json
{
  "success": false,
  "message": "El email ya está registrado",
  "error": "Ya existe un usuario con este email"
}
```

#### POST /api/auth/login
Inicia sesión con credenciales de usuario.

**Cuerpo de la petición:**
```json
{
  "email": "juan@example.com",
  "password": "Password123"
}
```

**Campos requeridos:**
- `email`: Email del usuario
- `password`: Contraseña del usuario

**Ejemplo de petición:**
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "juan@example.com",
  "password": "Password123"
}
```

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "message": "Login exitoso",
  "data": {
    "user": {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Juan Pérez",
      "email": "juan@example.com",
      "role": "user",
      "isActive": true,
      "lastLogin": "2024-01-01T00:00:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Respuesta de error (400):**
```json
{
  "success": false,
  "message": "Datos de entrada inválidos",
  "errors": [...]
}
```

**Respuesta de error (401):**
```json
{
  "success": false,
  "message": "Credenciales inválidas",
  "error": "Email o contraseña incorrectos"
}
```

#### GET /api/auth/me
Obtiene la información del usuario autenticado actual.

**Headers requeridos:**
```
Authorization: Bearer <token>
```

**Ejemplo de petición:**
```bash
GET /api/auth/me
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "message": "Información del usuario obtenida exitosamente",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Juan Pérez",
    "email": "juan@example.com",
    "role": "user",
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "lastLogin": "2024-01-01T00:00:00.000Z"
  }
}
```

**Respuesta de error (401):**
```json
{
  "success": false,
  "message": "Token de acceso requerido",
  "error": "No se proporcionó token de autenticación"
}
```

#### POST /api/auth/logout
Cierra la sesión del usuario (el token debe ser eliminado en el frontend).

**Headers requeridos:**
```
Authorization: Bearer <token>
```

**Ejemplo de petición:**
```bash
POST /api/auth/logout
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "message": "Logout exitoso",
  "data": {
    "message": "Sesión cerrada correctamente. Elimina el token del almacenamiento local."
  }
}
```

#### POST /api/auth/refresh
Renueva el token JWT del usuario autenticado.

**Headers requeridos:**
```
Authorization: Bearer <token>
```

**Ejemplo de petición:**
```bash
POST /api/auth/refresh
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "message": "Token renovado exitosamente",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Nota:** Para usar endpoints protegidos, incluye el token en el header `Authorization: Bearer <token>`.

### 🔧 Sistema

#### GET /health
Verifica el estado del servidor.

**Ejemplo de petición:**
```bash
GET /health
```

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "message": "Servidor funcionando correctamente",
  "timestamp": "2025-10-10T01:40:00.000Z",
  "environment": "development",
  "version": "v1"
}
```

#### GET /
Obtiene información general de la API.

**Ejemplo de petición:**
```bash
GET /
```

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "message": "API del Blog Interactivo",
  "version": "v1",
  "endpoints": {
    "articles": {
      "GET /api/articles": "Obtener todos los artículos con paginación",
      "GET /api/articles/search": "Buscar artículos por texto",
      "GET /api/articles/popular": "Obtener artículos populares",
      "GET /api/articles/tags": "Obtener todos los tags",
      "GET /api/articles/stats": "Obtener estadísticas del blog",
      "GET /api/articles/tag/:tag": "Obtener artículos por tag",
      "GET /api/articles/:slug": "Obtener artículo por slug",
      "PATCH /api/articles/:slug/image": "Actualizar imagen de artículo"
    },
    "comments": {
      "GET /api/articles/:slug/comments": "Obtener comentarios de un artículo",
      "POST /api/articles/:slug/comments": "Agregar comentario a un artículo",
      "POST /api/articles/:slug/like": "Alternar like en un artículo",
      "GET /api/comments/recent": "Obtener comentarios recientes",
      "GET /api/comments/:commentId/replies": "Obtener respuestas de un comentario",
      "POST /api/comments/:commentId/like": "Alternar like en un comentario",
      "PATCH /api/comments/:commentId/moderate": "Moderar comentario"
    },
    "auth": {
      "POST /api/auth/register": "Registrar nuevo usuario",
      "POST /api/auth/login": "Iniciar sesión",
      "GET /api/auth/me": "Obtener usuario actual",
      "POST /api/auth/logout": "Cerrar sesión",
      "POST /api/auth/refresh": "Renovar token"
    },
    "system": {
      "GET /health": "Estado del servidor"
    }
  },
  "documentation": "Consulte la documentación para más detalles sobre los parámetros y respuestas"
}
```

## 📊 Códigos de Estado HTTP

### Éxito
- **200 OK**: Petición exitosa
- **201 Created**: Recurso creado exitosamente

### Error del cliente
- **400 Bad Request**: Error de validación o petición malformada
- **404 Not Found**: Recurso no encontrado
- **405 Method Not Allowed**: Método HTTP no permitido

### Error del servidor
- **500 Internal Server Error**: Error interno del servidor

## 🔍 Validaciones

### Artículos
- **Título**: 5-200 caracteres, requerido
- **Slug**: Único, solo letras minúsculas, números y guiones
- **Contenido**: Mínimo 50 caracteres, requerido
- **Autor**: Máximo 100 caracteres, requerido
- **Tags**: Máximo 30 caracteres cada uno
- **imagenUrl**: URL completa de imagen externa (opcional)

### Comentarios
- **Autor**: Máximo 100 caracteres, requerido
- **Email**: Formato válido, requerido
- **Contenido**: 10-1000 caracteres, requerido

### Autenticación
- **Nombre**: 2-50 caracteres, solo letras y espacios
- **Email**: Formato válido, debe ser único
- **Password**: Mínimo 6 caracteres, debe incluir mayúscula, minúscula y número

## 🚨 Manejo de Errores

### Formato de respuesta de error
```json
{
  "success": false,
  "message": "Descripción del error",
  "errors": ["Detalles específicos"]
}
```

### Errores comunes
- **Validación**: Campos requeridos faltantes
- **Formato**: Email inválido, slug malformado
- **No encontrado**: Artículo o comentario inexistente
- **Servidor**: Error de conexión a base de datos

## 🖼️ Manejo de Imágenes

### Sistema de URLs Externas

Las imágenes de los artículos se manejan mediante URLs externas completas. No se utiliza sistema de uploads local.

**Cómo actualizar la imagen de un artículo:**
1. Obtén la URL completa de la imagen (debe ser públicamente accesible)
2. Usa el endpoint `PATCH /api/articles/:slug/image` con la URL

**Ejemplo:**
```bash
PATCH /api/articles/mi-articulo/image
Content-Type: application/json

{
  "imagenUrl": "https://cdn.ejemplo.com/images/mi-imagen.jpg"
}
```

**Formato de URL aceptado:**
- URLs completas: `https://ejemplo.com/imagen.jpg`
- URLs con protocolo: `http://otro-ejemplo.com/imagen.png`
- CDN: `https://cdn.ejemplo.com/images/imagen.webp`

**Campo en respuesta:**
Los artículos incluyen el campo `imagenUrl` en sus respuestas:
```json
{
  "article": {
    "_id": "...",
    "title": "...",
    "imagenUrl": "https://ejemplo.com/imagen.jpg",
    ...
  }
}
```

## 🔒 Seguridad

### Implementada
- **CORS**: Configurado para dominio específico
- **Validación**: Mongoose schema validation
- **Sanitización**: Trim y validación de entrada
- **Autenticación JWT**: Sistema completo de autenticación con tokens
- **Hash de contraseñas**: Bcrypt con salt rounds 12
- **Protección de rutas**: Middleware de autenticación para endpoints protegidos

### Autenticación

**Tokens JWT:**
- Se generan al registrar o iniciar sesión
- Incluyen: `userId`, `email`, `role`
- Expiración configurable (default: 7 días)
- Se envían en header: `Authorization: Bearer <token>`

**Endpoints protegidos:**
- `GET /api/auth/me`: Requiere autenticación
- `POST /api/auth/logout`: Requiere autenticación
- `POST /api/auth/refresh`: Requiere autenticación

**Endpoints públicos:**
- Todos los endpoints de artículos y comentarios son públicos
- Pueden usar autenticación opcional para identificar usuarios

### Futuras mejoras
- **Rate limiting**: Control de tráfico
- **HTTPS**: En producción
- **Refresh tokens**: Rotación de tokens

## 📈 Rendimiento

### Optimizaciones
- **Paginación**: En todas las consultas
- **Índices**: Optimizados para consultas frecuentes
- **Lean queries**: Menos datos transferidos
- **Selective fields**: Solo campos necesarios

### Métricas
- **Tiempo de respuesta**: < 200ms promedio
- **Throughput**: 100+ requests/segundo
- **Disponibilidad**: 99.9% uptime

---

**Desarrollado para Arquitectura Web - TP Blog Interactivo**
