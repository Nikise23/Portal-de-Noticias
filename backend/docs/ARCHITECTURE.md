# Arquitectura del Sistema - Backend Blog Interactivo

## 📋 Información del Proyecto

- **Materia**: Arquitectura Web
- **Proyecto**: Blog Interactivo / Portal de Noticias
- **Desarrolladores**: 
- **Rol**: 
- **Stack Backend**: Node.js + Express + MongoDB Atlas
- **Stack Frontend**: Vue 3 + Vite + Vue Router + Pinia + Bootstrap 5

## 🏗️ Arquitectura General

### Diagrama de Componentes

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENTE (Frontend)                      │
│                    Vue 3 + Vite + Vue Router                   │
│                    Pinia (State Management)                    │
│                    Bootstrap 5 (UI Framework)                  │
└─────────────────────┬───────────────────────────────────────────┘
                       │ HTTP/HTTPS + JSON
                       │ CORS habilitado
                       │ Authorization: Bearer <JWT Token>
┌─────────────────────▼───────────────────────────────────────────┐
│                     SERVIDOR WEB                                │
│                   Node.js + Express                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐              │
│  │   Routes    │  │Controllers  │  │ Middleware  │              │
│  │             │  │             │  │             │              │
│  │ /api/articles│  │ArticleCtrl  │  │ CORS, JSON │              │
│  │ /api/comments│  │CommentCtrl  │  │ Error Handle│              │
│  │ /api/auth   │  │AuthCtrl     │  │ Auth JWT   │              │
│  └─────────────┘  └─────────────┘  └─────────────┘              │
└─────────────────────┬───────────────────────────────────────────┘
                       │ Mongoose ODM
                       │ Connection Pool
┌─────────────────────▼───────────────────────────────────────────┐
│                  BASE DE DATOS                                  │
│                MongoDB Atlas                                     │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐              │
│  │  Articles   │  │  Comments   │  │    Users    │              │
│  │ Collection  │  │ Collection  │  │ Collection  │              │
│  │             │  │             │  │             │              │
│  │ - title     │  │ - articleId │  │ - name      │              │
│  │ - content   │  │ - author    │  │ - email     │              │
│  │ - author    │  │ - content   │  │ - password  │              │
│  │ - imagenUrl │  │ - likes     │  │ - role      │              │
│  │ - tags      │  │             │  │             │              │
│  │ - likes     │  │             │  │             │              │
│  └─────────────┘  └─────────────┘  └─────────────┘              │
│                                                                  │
│  ┌─────────────┐                                                │
│  │   Indexes   │                                                │
│  │             │                                                │
│  │ Text Search │                                                │
│  │ - slug      │                                                │
│  │ - tags      │                                                │
│  │ - author    │                                                │
│  │ - email     │                                                │
│  └─────────────┘                                                │
└─────────────────────────────────────────────────────────────────┘
```

### Flujo de Datos

**Flujo General:**
```
1. Cliente → HTTP Request → Express Server
2. Express → Middleware (CORS, JSON, Auth) → Route Handler
3. Route Handler → Controller
4. Controller → Mongoose Model → MongoDB Atlas
5. MongoDB → Query Result → Controller
6. Controller → JSON Response → Express
7. Express → HTTP Response → Cliente
```

**Flujo con Autenticación:**
```
1. Cliente → POST /api/auth/register → Express Server
2. Express → JSON Parser → Auth Route Handler
3. Auth Controller → Validación → User Model
4. User Model → Bcrypt (hash password) → MongoDB Atlas
5. MongoDB → User creado → Auth Controller
6. Auth Controller → Generar JWT Token → Express
7. Express → JSON Response (user + token) → Cliente

8. Cliente → Request con Authorization Header → Express
9. Express → Auth Middleware → Verificar JWT Token
10. Auth Middleware → User.findById() → MongoDB Atlas
11. MongoDB → User encontrado → Auth Middleware
12. Auth Middleware → Agregar req.user → Next()
13. Route Handler → Controller → ...
```

## 🎯 Patrones de Diseño Implementados

### 1. MVC (Model-View-Controller)
- **Models**: `Article.js`, `Comment.js`, `User.js`, `Like.js` (Esquemas Mongoose)
- **Views**: JSON Responses (API REST)
- **Controllers**: `articleController.js`, `commentController.js`, `authController.js`

### 2. Repository Pattern
- Los modelos Mongoose actúan como repositorios
- Encapsulan la lógica de acceso a datos
- Métodos estáticos para consultas complejas

### 3. Middleware Pattern
- **CORS**: Configuración de acceso cross-origin
- **JSON Parser**: Parseo de cuerpos de petición
- **Error Handler**: Manejo centralizado de errores
- **Logging**: Registro de peticiones (desarrollo)
- **Authentication**: Middleware JWT para verificación de tokens
- **Optional Auth**: Middleware opcional para identificar usuarios sin requerir autenticación

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

### 5. Autenticación JWT

**Decisión**: JWT tokens vs Session-based authentication

**Implementación actual**:
```javascript
// Middleware de autenticación
const authenticateToken = async (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded.userId);
  req.user = user;
  next();
};
```

**Justificación**:
- ✅ Stateless: No requiere almacenamiento en servidor
- ✅ Escalable: Funciona con múltiples servidores
- ✅ Estándar: Ampliamente utilizado en APIs REST
- ✅ Seguro: Tokens firmados con secreto

**Características implementadas**:
- Registro de usuarios con hash de contraseñas (bcrypt)
- Login con generación de tokens JWT
- Middleware de autenticación para rutas protegidas
- Autenticación opcional para identificar usuarios
- Refresh tokens para renovar sesiones

### 6. Manejo de Imágenes

**Decisión**: URLs externas vs Sistema de uploads local

**Implementación actual**:
```javascript
// Campo imagenUrl en Article
imagenUrl: String (optional, URL externa completa)

// Actualización mediante endpoint
PATCH /api/articles/:slug/image
{
  "imagenUrl": "https://ejemplo.com/imagen.jpg"
}
```

**Justificación**:
- ✅ Simplicidad: No requiere gestión de almacenamiento
- ✅ Escalabilidad: CDN externos manejan el tráfico
- ✅ Mantenimiento: Menos código y configuración
- ✅ Flexibilidad: Permite cualquier servicio de imágenes

**Alternativa rechazada**:
- ❌ Sistema de uploads local: Requiere más infraestructura y gestión

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
  imagenUrl: String (optional, URL externa completa),
  tags: [String] (max 30 chars each),
  likesCount: Number (default: 0),
  viewsCount: Number (default: 0),
  isPublished: Boolean (default: true),
  publishedAt: Date (default: now),
  updatedAt: Date (auto-updated),
  createdAt: Date (auto-generated)
}
```

### Colección Users
```javascript
{
  _id: ObjectId,
  name: String (required, 2-50 chars),
  email: String (required, unique, lowercase),
  password: String (required, hashed with bcrypt, select: false),
  avatar: String (optional),
  role: String (enum: ['user', 'admin'], default: 'user'),
  isActive: Boolean (default: true),
  lastLogin: Date (optional),
  createdAt: Date (auto-generated),
  updatedAt: Date (auto-updated)
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

### Colección Likes (Opcional - para sistema de likes por usuario)
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User, required),
  articleId: ObjectId (ref: Article, required),
  createdAt: Date (auto-generated),
  updatedAt: Date (auto-updated)
}
```

**Nota**: El sistema actual usa contadores (`likesCount`) en los documentos Article y Comment en lugar de una colección separada de Likes para mejor rendimiento.

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

### Users Collection
```javascript
// Índice único para email
{ email: 1 } (unique)

// Índice para ordenamiento por fecha de creación
{ createdAt: -1 }

// Índice para filtros por rol
{ role: 1 }

// Índice para filtros por estado activo
{ isActive: 1 }
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
- **Autenticación JWT**: Sistema completo implementado con tokens, registro, login y protección de rutas
- **Hash de contraseñas**: Bcrypt con salt rounds 12
- **Protección de rutas**: Middleware de autenticación para endpoints protegidos
- **Rate limiting**: Preparado para implementar

### Futuras mejoras
- **HTTPS**: En producción
- **Input sanitization**: Librerías especializadas
- **API rate limiting**: Control de tráfico más granular

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
