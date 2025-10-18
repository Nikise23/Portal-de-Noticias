# Documentación Swagger - Blog Interactivo API

## 📋 Información del Proyecto

- **Proyecto**: Blog Interactivo Backend API
- **Materia**: Arquitectura Web
- **Documentación**: Swagger/OpenAPI 3.0
- **Desarrollador**: Nicolas Fernandez
- **Versión**: 1.0.0

## 🚀 Swagger UI

### Acceso a la Documentación

La documentación interactiva de la API está disponible en:

- **Desarrollo**: http://localhost:3000/api-docs
- **Producción**: https://api-blog-interactivo.herokuapp.com/api-docs

### Características de Swagger UI

- **Interfaz interactiva**: Prueba los endpoints directamente desde el navegador
- **Esquemas de datos**: Visualiza la estructura de request/response
- **Ejemplos**: Datos de ejemplo para cada endpoint
- **Validación**: Validación automática de parámetros
- **Autenticación**: Soporte para diferentes tipos de autenticación

## 📚 Estructura de la Documentación

### Información General

```yaml
openapi: 3.0.0
info:
  title: Blog Interactivo API
  version: 1.0.0
  description: API REST para un blog interactivo con sistema de comentarios y reacciones
  contact:
    name: Nicolas Fernandez
    email: nicolas.fernandez@example.com
  license:
    name: MIT
    url: https://opensource.org/licenses/MIT
```

### Servidores

```yaml
servers:
  - url: http://localhost:3000
    description: Servidor de desarrollo
  - url: https://api-blog-interactivo.herokuapp.com
    description: Servidor de producción
```

### Tags

La documentación está organizada en las siguientes categorías:

- **Articles**: Operaciones relacionadas con artículos
- **Comments**: Operaciones relacionadas con comentarios
- **System**: Operaciones del sistema

## 🔧 Esquemas de Datos

### Article Schema

```yaml
Article:
  type: object
  required: [title, content, author]
  properties:
    _id:
      type: string
      description: ID único del artículo
      example: "507f1f77bcf86cd799439011"
    title:
      type: string
      description: Título del artículo
      example: "Introducción a Node.js"
    slug:
      type: string
      description: Slug único para URLs
      example: "introduccion-nodejs"
    content:
      type: string
      description: Contenido del artículo
      example: "Node.js es un entorno de ejecución para JavaScript..."
    author:
      type: string
      description: Autor del artículo
      example: "Juan Pérez"
    tags:
      type: array
      items:
        type: string
      description: Tags del artículo
      example: ["nodejs", "javascript", "backend"]
    likesCount:
      type: number
      description: Número de likes
      example: 42
    readingTime:
      type: number
      description: Tiempo de lectura en minutos
      example: 5
    createdAt:
      type: string
      format: date-time
      description: Fecha de creación
      example: "2023-10-10T10:30:00.000Z"
    updatedAt:
      type: string
      format: date-time
      description: Fecha de última actualización
      example: "2023-10-10T10:30:00.000Z"
```

### Comment Schema

```yaml
Comment:
  type: object
  required: [articleId, author, content]
  properties:
    _id:
      type: string
      description: ID único del comentario
      example: "507f1f77bcf86cd799439012"
    articleId:
      type: string
      description: ID del artículo
      example: "507f1f77bcf86cd799439011"
    author:
      type: string
      description: Autor del comentario
      example: "María García"
    content:
      type: string
      description: Contenido del comentario
      example: "Excelente artículo, muy útil!"
    likesCount:
      type: number
      description: Número de likes
      example: 8
    parentId:
      type: string
      description: ID del comentario padre (para respuestas)
      example: "507f1f77bcf86cd799439012"
    isModerated:
      type: boolean
      description: Si el comentario está moderado
      example: false
    createdAt:
      type: string
      format: date-time
      description: Fecha de creación
      example: "2023-10-10T10:30:00.000Z"
    updatedAt:
      type: string
      format: date-time
      description: Fecha de última actualización
      example: "2023-10-10T10:30:00.000Z"
```

## 📖 Endpoints Documentados

### Artículos

#### GET /api/articles
- **Descripción**: Obtiene una lista paginada de artículos con filtros opcionales
- **Parámetros**: page, limit, search, tag, author, sortBy, sortOrder
- **Respuesta**: Lista de artículos con metadatos de paginación

#### GET /api/articles/{slug}
- **Descripción**: Obtiene un artículo específico por su slug único
- **Parámetros**: slug (path)
- **Respuesta**: Artículo completo

#### GET /api/articles/search
- **Descripción**: Busca artículos por texto usando índices de MongoDB
- **Parámetros**: q (required), page, limit, sortBy, sortOrder
- **Respuesta**: Resultados de búsqueda con metadatos

### Comentarios

#### GET /api/articles/{slug}/comments
- **Descripción**: Obtiene todos los comentarios de un artículo específico
- **Parámetros**: slug (path), page, limit, includeReplies
- **Respuesta**: Lista de comentarios con paginación

#### POST /api/articles/{slug}/comments
- **Descripción**: Crea un nuevo comentario en un artículo específico
- **Parámetros**: slug (path)
- **Body**: author, email, content, parentCommentId
- **Respuesta**: Comentario creado

### Sistema

#### GET /health
- **Descripción**: Verifica que el servidor esté funcionando correctamente
- **Respuesta**: Estado del servidor

#### GET /
- **Descripción**: Obtiene información general sobre la API
- **Respuesta**: Información de la API y endpoints disponibles

## 🔧 Configuración Técnica

### Dependencias

```json
{
  "swagger-jsdoc": "^6.2.8",
  "swagger-ui-express": "^5.0.0"
}
```

### Configuración en server.js

```javascript
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Blog Interactivo API',
      version: '1.0.0',
      description: 'API REST para un blog interactivo...'
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: 'Servidor de desarrollo'
      }
    ],
    components: {
      schemas: {
        Article: { /* ... */ },
        Comment: { /* ... */ },
        Error: { /* ... */ },
        Success: { /* ... */ }
      }
    },
    tags: [
      { name: 'Articles', description: 'Operaciones relacionadas con artículos' },
      { name: 'Comments', description: 'Operaciones relacionadas con comentarios' },
      { name: 'System', description: 'Operaciones del sistema' }
    ]
  },
  apis: ['./routes/*.js', './controllers/*.js', './server.js']
};

const specs = swaggerJsdoc(swaggerOptions);

// Configurar Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'Blog Interactivo API Documentation',
  customfavIcon: '/favicon.ico'
}));
```

### Anotaciones JSDoc

Los endpoints se documentan usando anotaciones JSDoc:

```javascript
/**
 * @swagger
 * /api/articles:
 *   get:
 *     summary: Obtener todos los artículos
 *     description: Obtiene una lista paginada de artículos con filtros opcionales
 *     tags: [Articles]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Número de página
 *     responses:
 *       200:
 *         description: Lista de artículos obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     articles:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Article'
 */
```

## 🚀 Uso de la Documentación

### Para Desarrolladores

1. **Acceder a Swagger UI**: Navegar a `/api-docs`
2. **Explorar endpoints**: Hacer clic en cualquier endpoint para ver detalles
3. **Probar endpoints**: Usar el botón "Try it out" para probar endpoints
4. **Ver esquemas**: Revisar los esquemas de datos en la sección "Schemas"

### Para Frontend

1. **Integración**: Usar la documentación para entender la estructura de datos
2. **Validación**: Verificar tipos de datos y formatos esperados
3. **Ejemplos**: Usar los ejemplos proporcionados para testing
4. **Códigos de estado**: Entender los diferentes códigos de respuesta

### Para Testing

1. **Pruebas manuales**: Usar Swagger UI para pruebas rápidas
2. **Validación de datos**: Verificar que los datos cumplan con los esquemas
3. **Casos de error**: Probar diferentes escenarios de error
4. **Documentación**: Usar la documentación como referencia para tests automatizados

## 🔍 Características Avanzadas

### Validación Automática

- **Parámetros**: Validación automática de tipos y formatos
- **Body**: Validación de esquemas de request body
- **Responses**: Validación de esquemas de response

### Ejemplos Interactivos

- **Datos de ejemplo**: Cada endpoint incluye ejemplos realistas
- **Pruebas en vivo**: Posibilidad de probar endpoints directamente
- **Respuestas reales**: Ver respuestas reales del servidor

### Personalización

- **CSS personalizado**: Interfaz personalizada sin topbar
- **Título personalizado**: "Blog Interactivo API Documentation"
- **Favicon**: Icono personalizado para la documentación

## 📈 Beneficios de Swagger

### Para el Desarrollo

- **Documentación automática**: Se genera automáticamente desde el código
- **Sincronización**: Siempre actualizada con el código
- **Validación**: Validación automática de esquemas
- **Testing**: Herramientas integradas para testing

### Para la Colaboración

- **Frontend**: Facilita la integración con el frontend
- **QA**: Herramientas para testing y validación
- **DevOps**: Documentación clara para despliegue
- **Clientes**: Documentación profesional para APIs públicas

### Para el Mantenimiento

- **Versionado**: Soporte para versiones de API
- **Evolución**: Facilita la evolución de la API
- **Deprecación**: Marcado de endpoints deprecados
- **Migración**: Guías para migración entre versiones

## 🚨 Mejores Prácticas

### Documentación

- **Descripciones claras**: Usar descripciones descriptivas y claras
- **Ejemplos realistas**: Proporcionar ejemplos que reflejen casos reales
- **Códigos de estado**: Documentar todos los códigos de respuesta posibles
- **Errores**: Documentar todos los tipos de errores

### Esquemas

- **Reutilización**: Usar referencias para esquemas comunes
- **Validación**: Incluir reglas de validación apropiadas
- **Tipos**: Usar tipos de datos apropiados
- **Formatos**: Especificar formatos cuando sea relevante

### Organización

- **Tags**: Usar tags para organizar endpoints lógicamente
- **Agrupación**: Agrupar endpoints relacionados
- **Orden**: Ordenar endpoints de manera lógica
- **Navegación**: Facilitar la navegación en la documentación

---

**Desarrollado para Arquitectura Web - TP Blog Interactivo**



