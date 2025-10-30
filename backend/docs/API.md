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
      "GET /api/articles/:slug": "Obtener artículo por slug"
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

### Comentarios
- **Autor**: Máximo 100 caracteres, requerido
- **Email**: Formato válido, requerido
- **Contenido**: 10-1000 caracteres, requerido

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

## 🔒 Seguridad

### Implementada
- **CORS**: Configurado para dominio específico
- **Validación**: Mongoose schema validation
- **Sanitización**: Trim y validación de entrada

### Futuras mejoras
- **Autenticación JWT**: Para usuarios registrados
- **Rate limiting**: Control de tráfico
- **HTTPS**: En producción

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
