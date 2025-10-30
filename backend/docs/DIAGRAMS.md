# Diagramas del Sistema - Blog Interactivo

## 🏗️ Diagrama de Arquitectura General

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENTE (Frontend)                      │
│                    (React/Vue/Angular)                         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐            │
│  │   Component │  │   Services   │  │   Router    │            │
│  │   Articles  │  │   HTTP API   │  │   Routes    │            │
│  │   Comments  │  │   Requests   │  │   Guards    │            │
│  └─────────────┘  └─────────────┘  └─────────────┘            │
└─────────────────────┬───────────────────────────────────────────┘
                       │ HTTP/HTTPS + JSON
                       │ CORS habilitado
                       │ Content-Type: application/json
┌─────────────────────▼───────────────────────────────────────────┐
│                     SERVIDOR WEB                                │
│                   Node.js + Express                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐              │
│  │   Routes    │  │Controllers  │  │ Middleware  │              │
│  │             │  │             │  │             │              │
│  │ /api/articles│  │ArticleCtrl  │  │ CORS, JSON │              │
│  │ /api/comments│  │CommentCtrl  │  │ Error Handle│              │
│  │ /health     │  │             │  │ Logging     │              │
│  └─────────────┘  └─────────────┘  └─────────────┘              │
└─────────────────────┬───────────────────────────────────────────┘
                       │ Mongoose ODM
                       │ Connection Pool (max 10)
                       │ Auto-reconnect
┌─────────────────────▼───────────────────────────────────────────┐
│                  BASE DE DATOS                                  │
│                MongoDB Atlas                                     │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐              │
│  │  Articles   │  │  Comments   │  │   Indexes   │              │
│  │ Collection  │  │ Collection  │  │             │              │
│  │             │  │             │  │ Text Search │              │
│  │ - _id       │  │ - _id       │  │ - slug      │              │
│  │ - title     │  │ - articleId │  │ - tags      │              │
│  │ - slug      │  │ - author    │  │ - author    │              │
│  │ - content   │  │ - email     │  │ - title     │              │
│  │ - author    │  │ - content   │  │ - content   │              │
│  │ - tags      │  │ - likes     │  │             │              │
│  │ - likes     │  │ - parentId  │  │             │              │
│  │ - views     │  │ - approved  │  │             │              │
│  │ - published │  │ - timestamps│  │             │              │
│  │ - timestamps│  │             │  │             │              │
│  └─────────────┘  └─────────────┘  └─────────────┘              │
└─────────────────────────────────────────────────────────────────┘
```

## 🔄 Flujo de Datos Detallado

```
1. CLIENTE → HTTP Request → EXPRESS SERVER
   ├── Headers: Content-Type, Origin
   ├── Method: GET/POST/PUT/DELETE
   └── Body: JSON (si aplica)

2. EXPRESS → Route Handler → CONTROLLER
   ├── Validación de parámetros
   ├── Parsing de query strings
   └── Middleware de autenticación

3. CONTROLLER → Mongoose → MONGODB ATLAS
   ├── Query building
   ├── Validation
   └── Connection pooling

4. MONGODB → Query Result → CONTROLLER
   ├── Data retrieval
   ├── Aggregation results
   └── Error handling

5. CONTROLLER → JSON Response → EXPRESS
   ├── Data formatting
   ├── Error responses
   └── Status codes

6. EXPRESS → HTTP Response → CLIENTE
   ├── Headers: CORS, Content-Type
   ├── Status: 200, 201, 400, 404, 500
   └── Body: JSON data
```

## 📊 Diagrama de Base de Datos

### Colección Articles
```
┌─────────────────────────────────────────────────────────────────┐
│                        ARTICLES COLLECTION                     │
├─────────────────────────────────────────────────────────────────┤
│  _id: ObjectId (Primary Key)                                   │
│  title: String (required, 5-200 chars)                         │
│  slug: String (required, unique, lowercase)                    │
│  content: String (required, min 50 chars)                      │
│  excerpt: String (auto-generated, max 300 chars)                │
│  author: String (required, max 100 chars)                     │
│  tags: [String] (max 30 chars each)                           │
│  likesCount: Number (default: 0)                               │
│  viewsCount: Number (default: 0)                                │
│  isPublished: Boolean (default: true)                          │
│  publishedAt: Date (default: now)                              │
│  updatedAt: Date (auto-updated)                               │
│  createdAt: Date (auto-generated)                              │
├─────────────────────────────────────────────────────────────────┤
│  VIRTUAL FIELDS:                                               │
│  - url: String (computed)                                      │
│  - readingTime: Number (computed)                              │
├─────────────────────────────────────────────────────────────────┤
│  INDEXES:                                                      │
│  - { slug: 1 } (unique)                                        │
│  - { title: "text", content: "text" }                         │
│  - { publishedAt: -1 }                                         │
│  - { tags: 1 }                                                 │
│  - { author: 1 }                                              │
└─────────────────────────────────────────────────────────────────┘
```

### Colección Comments
```
┌─────────────────────────────────────────────────────────────────┐
│                        COMMENTS COLLECTION                     │
├─────────────────────────────────────────────────────────────────┤
│  _id: ObjectId (Primary Key)                                   │
│  articleId: ObjectId (ref: Article, required)                 │
│  author: String (required, max 100 chars)                     │
│  email: String (required, email format)                       │
│  content: String (required, 10-1000 chars)                    │
│  parentCommentId: ObjectId (ref: Comment, optional)            │
│  isApproved: Boolean (default: true)                           │
│  likesCount: Number (default: 0)                               │
│  isEdited: Boolean (default: false)                            │
│  editedAt: Date (optional)                                    │
│  createdAt: Date (auto-generated)                             │
│  updatedAt: Date (auto-generated)                              │
├─────────────────────────────────────────────────────────────────┤
│  VIRTUAL FIELDS:                                               │
│  - replies: [Comment] (populated)                              │
│  - isReply: Boolean (computed)                                 │
├─────────────────────────────────────────────────────────────────┤
│  INDEXES:                                                      │
│  - { articleId: 1, createdAt: -1 }                              │
│  - { parentCommentId: 1 }                                      │
│  - { isApproved: 1 }                                           │
│  - { author: 1 }                                               │
└─────────────────────────────────────────────────────────────────┘
```

## 🔗 Relaciones entre Colecciones

```
ARTICLES COLLECTION                    COMMENTS COLLECTION
┌─────────────────────┐                ┌─────────────────────┐
│ _id: ObjectId       │◄──────────────┤ articleId: ObjectId │
│ title: String       │                │ author: String     │
│ slug: String        │                │ email: String      │
│ content: String     │                │ content: String    │
│ author: String      │                │ parentCommentId:   │
│ tags: [String]      │                │ isApproved: Boolean│
│ likesCount: Number  │                │ likesCount: Number │
│ viewsCount: Number  │                │ createdAt: Date   │
│ publishedAt: Date   │                │ updatedAt: Date   │
│ createdAt: Date     │                └─────────────────────┘
│ updatedAt: Date     │
└─────────────────────┘

RELACIONES:
- 1 Article → N Comments (One-to-Many)
- 1 Comment → N Replies (One-to-Many, self-referencing)
- Comments pueden tener respuestas anidadas
```

## 🎯 Patrones de Diseño Implementados

### 1. MVC (Model-View-Controller)
```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│    MODEL    │    │   CONTROLLER│    │    VIEW     │
│             │    │             │    │             │
│ Article.js  │◄──►│ArticleCtrl  │◄──►│ JSON Response│
│ Comment.js  │    │CommentCtrl  │    │             │
│             │    │             │    │             │
│ - Schema    │    │ - Business  │    │ - API       │
│ - Methods   │    │   Logic    │    │   Format    │
│ - Validation│    │ - Validation│    │ - Status    │
│ - Indexes   │    │ - Error    │    │   Codes     │
└─────────────┘    └─────────────┘    └─────────────┘
```

### 2. Repository Pattern
```
┌─────────────────────────────────────────────────────────────────┐
│                    REPOSITORY LAYER                            │
├─────────────────────────────────────────────────────────────────┤
│  Article Repository          │  Comment Repository             │
│  ┌─────────────────────────┐ │  ┌─────────────────────────┐     │
│  │ - findById()            │ │  │ - findByArticleId()    │     │
│  │ - findBySlug()          │ │  │ - findByParentId()     │     │
│  │ - searchByText()        │ │  │ - getRecentComments()  │     │
│  │ - getPopularArticles() │ │  │ - incrementLikes()    │     │
│  │ - incrementLikes()      │ │  │ - approveComment()     │     │
│  │ - incrementViews()      │ │  │ - createComment()      │     │
│  └─────────────────────────┘ │  └─────────────────────────┘     │
└─────────────────────────────────────────────────────────────────┘
```

### 3. Middleware Pattern
```
┌─────────────────────────────────────────────────────────────────┐
│                    MIDDLEWARE CHAIN                            │
├─────────────────────────────────────────────────────────────────┤
│  Request → CORS → JSON Parser → Route Handler → Response      │
│           │      │             │               │              │
│           │      │             │               │              │
│           ▼      ▼             ▼               ▼              │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐│
│  │ CORS       │ │ JSON        │ │ Route       │ │ Response    ││
│  │ Headers    │ │ Parsing     │ │ Handler     │ │ Formatting  ││
│  │ Origin     │ │ Body        │ │ Controller  │ │ Status      ││
│  │ Methods    │ │ Validation  │ │ Business    │ │ Headers     ││
│  └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘│
└─────────────────────────────────────────────────────────────────┘
```

## 🔍 Flujo de Búsqueda de Artículos

```
1. CLIENTE → GET /api/articles/search?q=nodejs
   ├── Query parameter: q=nodejs
   ├── Headers: Content-Type, Origin
   └── Method: GET

2. EXPRESS → Route Handler
   ├── Extract query parameters
   ├── Validate search term (min 2 chars)
   └── Call controller method

3. CONTROLLER → searchArticles()
   ├── Validate search term
   ├── Build MongoDB query
   └── Execute search with pagination

4. MONGODB → Text Index Search
   ├── Use text index on title + content
   ├── Apply filters (isPublished: true)
   └── Sort by relevance score

5. RESULT → Formatted Response
   ├── Apply pagination
   ├── Format JSON response
   └── Return to client

RESPUESTA:
{
  "success": true,
  "data": {
    "articles": [...],
    "searchTerm": "nodejs",
    "pagination": {...}
  }
}
```

## 💬 Flujo de Comentarios Anidados

```
1. COMENTARIO PRINCIPAL
   ┌─────────────────────┐
   │ _id: "comment1"     │
   │ articleId: "article1"│
   │ content: "Primer..." │
   │ parentCommentId: null│
   └─────────────────────┘

2. RESPUESTA AL COMENTARIO
   ┌─────────────────────┐
   │ _id: "comment2"      │
   │ articleId: "article1"│
   │ content: "Respuesta" │
   │ parentCommentId: "comment1"│
   └─────────────────────┘

3. RESPUESTA A LA RESPUESTA
   ┌─────────────────────┐
   │ _id: "comment3"      │
   │ articleId: "article1"│
   │ content: "Sub-respuesta"│
   │ parentCommentId: "comment2"│
   └─────────────────────┘

CONSULTA:
Comment.find({ articleId: "article1" })
  .populate('replies')
  .sort({ createdAt: -1 })
```

## 🚀 Escalabilidad del Sistema

### Horizontal Scaling
```
┌─────────────────────────────────────────────────────────────────┐
│                    LOAD BALANCER                               │
│                     (Nginx/HAProxy)                           │
└─────────────────────┬───────────────────────────────────────────┘
                       │
        ┌──────────────┼──────────────┐
        │              │              │
┌───────▼──────┐ ┌─────▼─────┐ ┌─────▼─────┐
│   INSTANCE 1 │ │ INSTANCE 2│ │ INSTANCE 3│
│   Node.js    │ │  Node.js  │ │  Node.js  │
│   Express    │ │  Express  │ │  Express  │
│   Port 3000  │ │  Port 3000│ │  Port 3000│
└──────────────┘ └───────────┘ └───────────┘
        │              │              │
        └──────────────┼──────────────┘
                       │
┌─────────────────────▼───────────────────────────────────────────┐
│                  MONGODB ATLAS                                 │
│              (Auto-scaling cluster)                            │
└─────────────────────────────────────────────────────────────────┘
```

### Vertical Scaling
```
┌─────────────────────────────────────────────────────────────────┐
│                    SINGLE INSTANCE                             │
│                   (High Performance)                          │
├─────────────────────────────────────────────────────────────────┤
│  CPU: 8 cores                                                  │
│  RAM: 16GB                                                     │
│  Storage: SSD 500GB                                           │
│  Network: 1Gbps                                               │
├─────────────────────────────────────────────────────────────────┤
│  Node.js Cluster Mode                                          │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐             │
│  │ Worker 1│ │ Worker 2│ │ Worker 3│ │ Worker 4│             │
│  │ Process │ │ Process │ │ Process │ │ Process │             │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘             │
└─────────────────────────────────────────────────────────────────┘
```

## 🔒 Seguridad y Validación

### Capas de Seguridad
```
┌─────────────────────────────────────────────────────────────────┐
│                    SECURITY LAYERS                             │
├─────────────────────────────────────────────────────────────────┤
│  1. CORS Configuration                                        │
│     - Origin whitelist                                         │
│     - Method restrictions                                       │
│     - Header validation                                        │
├─────────────────────────────────────────────────────────────────┤
│  2. Input Validation                                           │
│     - Mongoose schema validation                               │
│     - Field length limits                                      │
│     - Email format validation                                  │
│     - SQL injection prevention                                 │
├─────────────────────────────────────────────────────────────────┤
│  3. Rate Limiting                                              │
│     - Request frequency limits                                 │
│     - IP-based restrictions                                    │
│     - Endpoint-specific limits                                 │
├─────────────────────────────────────────────────────────────────┤
│  4. Error Handling                                             │
│     - Generic error messages                                   │
│     - No sensitive data exposure                               │
│     - Proper HTTP status codes                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

**Desarrollado para Arquitectura Web - TP Blog Interactivo**
