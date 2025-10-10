# Arquitectura del Sistema - Backend Blog Interactivo

## 📋 Información del Proyecto

- **Materia**: Arquitectura Web
- **Proyecto**: Blog Interactivo
- **Desarrollador**: Nicolas Fernandez
- **Rol**: Backend Developer
- **Stack**: Node.js + Express + MongoDB Atlas

## 🏗️ Arquitectura General

### Diagrama de Componentes

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENTE (Frontend)                      │
│                    (React/Vue/Angular)                         │
└─────────────────────┬───────────────────────────────────────────┘
                       │ HTTP/HTTPS + JSON
                       │ CORS habilitado
┌─────────────────────▼───────────────────────────────────────────┐
│                     SERVIDOR WEB                                │
│                   Node.js + Express                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐              │
│  │   Routes    │  │Controllers  │  │ Middleware  │              │
│  │             │  │             │  │             │              │
│  │ /api/articles│  │ArticleCtrl  │  │ CORS, JSON │              │
│  │ /api/comments│  │CommentCtrl  │  │ Error Handle│              │
│  └─────────────┘  └─────────────┘  └─────────────┘              │
└─────────────────────┬───────────────────────────────────────────┘
                       │ Mongoose ODM
                       │ Connection Pool
┌─────────────────────▼───────────────────────────────────────────┐
│                  BASE DE DATOS                                  │
│                MongoDB Atlas                                     │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐              │
│  │  Articles   │  │  Comments   │  │   Indexes   │              │
│  │ Collection  │  │ Collection  │  │             │              │
│  │             │  │             │  │ Text Search │              │
│  │ - title     │  │ - articleId │  │ - slug      │              │
│  │ - content   │  │ - author    │  │ - tags      │              │
│  │ - author    │  │ - content   │  │ - author    │              │
│  │ - tags      │  │ - likes     │  │             │              │
│  │ - likes     │  │             │  │             │              │
│  └─────────────┘  └─────────────┘  └─────────────┘              │
└─────────────────────────────────────────────────────────────────┘
```

### Flujo de Datos

```
1. Cliente → HTTP Request → Express Server
2. Express → Route Handler → Controller
3. Controller → Mongoose → MongoDB Atlas
4. MongoDB → Query Result → Controller
5. Controller → JSON Response → Express
6. Express → HTTP Response → Cliente
```

## 🎯 Patrones de Diseño Implementados

### 1. MVC (Model-View-Controller)
- **Models**: `Article.js`, `Comment.js` (Esquemas Mongoose)
- **Views**: JSON Responses (API REST)
- **Controllers**: `articleController.js`, `commentController.js`

### 2. Repository Pattern
- Los modelos Mongoose actúan como repositorios
- Encapsulan la lógica de acceso a datos
- Métodos estáticos para consultas complejas

### 3. Middleware Pattern
- **CORS**: Configuración de acceso cross-origin
- **JSON Parser**: Parseo de cuerpos de petición
- **Error Handler**: Manejo centralizado de errores
- **Logging**: Registro de peticiones (desarrollo)

## 🔧 Decisiones Técnicas

### 1. Base de Datos NoSQL (MongoDB)

**Decisión**: MongoDB en lugar de PostgreSQL/MySQL

**Justificación**:
- ✅ Flexibilidad de esquema para evolución del blog
- ✅ Alineación con JavaScript (JSON nativo)
- ✅ Escalabilidad horizontal automática
- ✅ Índices de texto para búsqueda nativa

**Alternativas consideradas**:
- ❌ PostgreSQL: Más complejo para datos JSON
- ❌ MySQL: Menos flexible para esquemas variables

### 2. Sistema de Likes

**Decisión**: Contador en documento vs Colección separada

**Implementación actual**:
```javascript
// En Article model
likesCount: { type: Number, default: 0 }

// Método para incrementar
article.incrementLikes()
```

**Justificación**:
- ✅ Mejor rendimiento para lecturas frecuentes
- ✅ Simplicidad en consultas
- ✅ Menos complejidad en la aplicación

**Alternativa rechazada**:
- ❌ Colección `likes` separada (más normalizado pero más complejo)

### 3. Comentarios Anidados

**Decisión**: Campo `parentCommentId` vs Estructura plana

**Implementación**:
```javascript
// En Comment model
parentCommentId: { type: ObjectId, ref: 'Comment', default: null }
```

**Justificación**:
- ✅ Flexibilidad para respuestas de cualquier nivel
- ✅ Consultas eficientes con populate
- ✅ Escalabilidad para threads largos

### 4. Búsqueda de Texto

**Decisión**: Índices de texto MongoDB vs Elasticsearch

**Implementación**:
```javascript
// Índice de texto en Article
articleSchema.index({ title: 'text', content: 'text' });

// Búsqueda con $text
Article.find({ $text: { $search: searchTerm } })
```

**Justificación**:
- ✅ Solución nativa sin dependencias externas
- ✅ Configuración simple
- ✅ Suficiente para un blog

**Alternativa rechazada**:
- ❌ Elasticsearch: Overkill para este proyecto

## 📊 Estructura de Datos

### Colección Articles
```javascript
{
  _id: ObjectId,
  title: String (required, 5-200 chars),
  slug: String (required, unique, lowercase),
  content: String (required, min 50 chars),
  excerpt: String (auto-generated),
  author: String (required, max 100 chars),
  tags: [String] (max 30 chars each),
  likesCount: Number (default: 0),
  viewsCount: Number (default: 0),
  isPublished: Boolean (default: true),
  publishedAt: Date (default: now),
  updatedAt: Date (auto-updated),
  createdAt: Date (auto-generated)
}
```

### Colección Comments
```javascript
{
  _id: ObjectId,
  articleId: ObjectId (ref: Article, required),
  author: String (required, max 100 chars),
  email: String (required, email format),
  content: String (required, 10-1000 chars),
  parentCommentId: ObjectId (ref: Comment, optional),
  isApproved: Boolean (default: true),
  likesCount: Number (default: 0),
  isEdited: Boolean (default: false),
  editedAt: Date (optional),
  createdAt: Date (auto-generated),
  updatedAt: Date (auto-generated)
}
```

## 🔍 Índices Optimizados

### Articles Collection
```javascript
// Índice único para slug
{ slug: 1 }

// Índice de texto para búsqueda
{ title: "text", content: "text" }

// Índice para ordenamiento por fecha
{ publishedAt: -1 }

// Índice para filtros por tag
{ tags: 1 }

// Índice para filtros por autor
{ author: 1 }
```

### Comments Collection
```javascript
// Índice compuesto para comentarios de artículo
{ articleId: 1, createdAt: -1 }

// Índice para respuestas
{ parentCommentId: 1 }

// Índice para comentarios aprobados
{ isApproved: 1 }

// Índice para filtros por autor
{ author: 1 }
```

## 🚀 Escalabilidad

### Horizontal Scaling
- **MongoDB Atlas**: Escalado automático
- **Connection Pooling**: Máximo 10 conexiones
- **Load Balancing**: Preparado para múltiples instancias

### Vertical Scaling
- **Índices optimizados**: Consultas rápidas
- **Paginación**: Evita cargar datos masivos
- **Caché**: Preparado para Redis (futuro)

### Performance Optimizations
- **Lean queries**: Menos datos transferidos
- **Selective fields**: Solo campos necesarios
- **Virtual fields**: Cálculos en tiempo de consulta
- **Middleware optimization**: Procesamiento eficiente

## 🔒 Seguridad

### Implementada
- **CORS**: Configurado para dominio específico
- **Validación**: Mongoose schema validation
- **Sanitización**: Trim y validación de entrada
- **Rate limiting**: Preparado para implementar

### Futuras mejoras
- **Autenticación JWT**: Para usuarios registrados
- **HTTPS**: En producción
- **Input sanitization**: Librerías especializadas
- **API rate limiting**: Control de tráfico

## 📈 Monitoreo y Logs

### Logs implementados
- **Conexión MongoDB**: Estado de conexión
- **Errores**: Manejo centralizado
- **Requests**: En modo desarrollo
- **Performance**: Tiempo de respuesta

### Métricas clave
- **Artículos**: Total, por día, por autor
- **Comentarios**: Total, por artículo, por día
- **Likes**: Total, por artículo, tendencias
- **API**: Tiempo de respuesta, errores por endpoint

## 🔄 Mantenimiento

### Tareas periódicas
- **Backup**: Automático en MongoDB Atlas
- **Logs rotation**: Configurar en producción
- **Performance monitoring**: Métricas de Atlas
- **Security updates**: Dependencias npm

### Troubleshooting común
- **Conexión MongoDB**: Verificar URI y credenciales
- **CORS errors**: Verificar configuración de origen
- **Validation errors**: Revisar esquemas Mongoose
- **Performance issues**: Analizar índices y consultas

---

**Desarrollado para Arquitectura Web - TP Blog Interactivo**
