# 🚀 Guía de Integración Frontend-Backend

## 📋 Resumen del Backend Implementado

### ¿Qué es lo que hice?
Desarrollé un **Backend API REST** completo para un blog interactivo usando **Node.js + Express + MongoDB**. El backend está listo para recibir peticiones del frontend y devolver datos estructurados en formato JSON.

---

## 🏗️ Arquitectura del Sistema

### Estructura General
```
Frontend (React/Vue/Angular) ←→ Backend API ←→ MongoDB Atlas
     ↓                              ↓              ↓
  Tu compañero                  Yo (backend)    Base de datos
```

### Flujo de Datos
1. **Frontend** hace petición HTTP (GET, POST, etc.)
2. **Backend** procesa la petición y consulta MongoDB
3. **MongoDB** devuelve los datos
4. **Backend** formatea la respuesta en JSON
5. **Frontend** recibe y muestra los datos

---

## 🔌 Endpoints Disponibles para el Frontend

### 📰 **Artículos**

#### 1. **Listar todos los artículos** (con paginación)
```http
GET /api/articles?page=1&limit=10
```
**Respuesta:**
```json
{
  "success": true,
  "data": {
    "articles": [
      {
        "title": "Introducción a Node.js",
        "slug": "introduccion-nodejs",
        "author": "Juan Pérez",
        "date": "2024-01-15T10:30:00.000Z",
        "tags": ["nodejs", "backend", "javascript"],
        "likesCount": 15,
        "readingTime": 5
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 3,
      "totalResults": 25,
      "hasNextPage": true,
      "hasPrevPage": false,
      "limit": 10
    }
  }
}
```

#### 2. **Obtener un artículo específico**
```http
GET /api/articles/introduccion-nodejs
```
**Respuesta:**
```json
{
  "success": true,
  "data": {
    "title": "Introducción a Node.js",
    "slug": "introduccion-nodejs",
    "content": "Node.js es un entorno de ejecución...",
    "author": "Juan Pérez",
    "date": "2024-01-15T10:30:00.000Z",
    "tags": ["nodejs", "backend", "javascript"],
    "likesCount": 15,
    "readingTime": 5,
    "viewsCount": 142
  }
}
```

#### 3. **Buscar artículos**
```http
GET /api/articles/search?q=nodejs&page=1&limit=10
```

#### 4. **Estadísticas del blog**
```http
GET /api/articles/stats
```
**Respuesta:**
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

### 💬 **Comentarios**

#### 1. **Obtener comentarios de un artículo**
```http
GET /api/articles/introduccion-nodejs/comments
```
**Respuesta:**
```json
{
  "success": true,
  "data": {
    "comments": [
      {
        "_id": "65f1234567890abcdef12345",
        "author": "María García",
        "content": "Excelente artículo, muy útil!",
        "date": "2024-01-16T14:20:00.000Z",
        "likesCount": 3
      }
    ],
    "totalComments": 1
  }
}
```

#### 2. **Agregar un comentario**
```http
POST /api/articles/introduccion-nodejs/comments
Content-Type: application/json

{
  "author": "Carlos López",
  "content": "Muy buen contenido, gracias por compartir!"
}
```

#### 3. **Dar like a un artículo**
```http
POST /api/articles/introduccion-nodejs/like
```

#### 4. **Comentarios recientes**
```http
GET /api/comments/recent?limit=5
```

---

## 🛠️ Configuración para el Frontend

### 1. **URL Base del Backend**
```javascript
const API_BASE_URL = 'http://localhost:3000/api';
// En producción: 'https://tu-servidor.com/api'
```

### 2. **Configuración CORS**
El backend ya está configurado para aceptar peticiones desde:
- `http://localhost:3001` (desarrollo)
- `http://localhost:3000` (desarrollo alternativo)
- Cualquier origen en producción

### 3. **Headers Recomendados**
```javascript
const headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
};
```

---

## 📱 Ejemplos de Uso en el Frontend

### **React/Vue/Angular - JavaScript**

#### Obtener artículos
```javascript
// Función para obtener artículos
async function getArticles(page = 1, limit = 10) {
  try {
    const response = await fetch(`${API_BASE_URL}/articles?page=${page}&limit=${limit}`);
    const data = await response.json();
    
    if (data.success) {
      return data.data.articles;
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    console.error('Error al obtener artículos:', error);
    return [];
  }
}

// Uso en componente
const [articles, setArticles] = useState([]);

useEffect(() => {
  getArticles().then(setArticles);
}, []);
```

#### Obtener un artículo específico
```javascript
async function getArticle(slug) {
  try {
    const response = await fetch(`${API_BASE_URL}/articles/${slug}`);
    const data = await response.json();
    
    if (data.success) {
      return data.data;
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    console.error('Error al obtener artículo:', error);
    return null;
  }
}
```

#### Agregar comentario
```javascript
async function addComment(articleSlug, author, content) {
  try {
    const response = await fetch(`${API_BASE_URL}/articles/${articleSlug}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ author, content })
    });
    
    const data = await response.json();
    return data.success;
  } catch (error) {
    console.error('Error al agregar comentario:', error);
    return false;
  }
}
```

#### Dar like
```javascript
async function likeArticle(articleSlug) {
  try {
    const response = await fetch(`${API_BASE_URL}/articles/${articleSlug}/like`, {
      method: 'POST'
    });
    
    const data = await response.json();
    return data.success;
  } catch (error) {
    console.error('Error al dar like:', error);
    return false;
  }
}
```

---

## 🎨 Sugerencias para el Frontend

### **Páginas Recomendadas**
1. **Home** - Lista de artículos con paginación
2. **Artículo** - Vista detallada del artículo + comentarios
3. **Búsqueda** - Resultados de búsqueda
4. **Estadísticas** - Dashboard con métricas del blog

### **Componentes Sugeridos**
- `ArticleCard` - Tarjeta de artículo (título, autor, fecha, likes)
- `ArticleList` - Lista paginada de artículos
- `ArticleDetail` - Vista completa del artículo
- `CommentSection` - Sección de comentarios
- `SearchBar` - Barra de búsqueda
- `Pagination` - Navegación de páginas
- `StatsDashboard` - Panel de estadísticas

### **Estados de Carga**
```javascript
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);

// Ejemplo de uso
const fetchData = async () => {
  setLoading(true);
  setError(null);
  
  try {
    const data = await getArticles();
    setArticles(data);
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};
```

---

## 🔧 Herramientas de Desarrollo

### **Swagger UI - Documentación Interactiva**
Accede a: `http://localhost:3000/api-docs`

**¿Qué es?**
- Interfaz web para probar todos los endpoints
- Documentación automática de la API
- Ejemplos de peticiones y respuestas

**¿Para qué sirve?**
- Probar endpoints antes de implementarlos en el frontend
- Ver la estructura exacta de las respuestas
- Entender los parámetros requeridos

### **Postman/Insomnia**
Para testing manual de la API:
- Importar la colección de endpoints
- Probar peticiones GET, POST
- Verificar respuestas JSON

---

## 🚀 Pasos para Empezar

### **1. Clonar el Repositorio**
```bash
git clone https://github.com/Nikise23/Portal-de-Noticias.git
cd Portal-de-Noticias
```

### **2. Configurar Backend**
```bash
# Instalar dependencias
npm install

# Crear archivo .env
cp env.example .env

# Editar .env con las credenciales de MongoDB
# (Las credenciales se comparten por separado)

# Ejecutar servidor
npm run dev
```

### **3. Verificar que Funciona**
- Backend: `http://localhost:3000`
- Swagger: `http://localhost:3000/api-docs`
- Health check: `http://localhost:3000/health`

### **4. Crear Frontend**
```bash
# Ejemplo con React
npx create-react-app frontend
cd frontend
npm start
```

### **5. Configurar CORS**
El backend ya acepta peticiones desde `http://localhost:3001`

---

## 📊 Datos de Prueba Disponibles

### **Artículos de Ejemplo**
- "Introducción a Node.js" (slug: `introduccion-nodejs`)
- "Fundamentos de Express" (slug: `fundamentos-express`)
- "MongoDB para Principiantes" (slug: `mongodb-principiantes`)
- "Autenticación JWT" (slug: `autenticacion-jwt`)
- "Deploy con Docker" (slug: `deploy-docker`)

### **Comentarios de Ejemplo**
- Cada artículo tiene comentarios de prueba
- Diferentes autores y fechas
- Sistema de likes funcional

---

## 🐛 Solución de Problemas Comunes

### **Error de CORS**
```javascript
// Si el frontend está en puerto diferente a 3001
// Cambiar en backend/.env:
CORS_ORIGIN=http://localhost:3000
```

### **Error de Conexión**
```javascript
// Verificar que el backend esté corriendo
fetch('http://localhost:3000/health')
  .then(res => res.json())
  .then(data => console.log(data));
```

### **Error 404**
```javascript
// Verificar que la URL sea correcta
// Usar slugs exactos: 'introduccion-nodejs'
// No usar títulos: 'Introducción a Node.js'
```

---

## 📞 Comunicación entre Equipos

### **Lo que Necesitas del Frontend**
- ¿Qué framework van a usar? (React, Vue, Angular)
- ¿Qué puerto van a usar? (para configurar CORS)
- ¿Qué funcionalidades específicas necesitan?

### **Lo que el Frontend Necesita de Ti**
- Credenciales de MongoDB (compartidas por separado)
- Confirmación de que el backend funciona
- Soporte técnico si hay problemas

---

## 🎯 Próximos Pasos

1. **Compartir este documento** con tu compañero
2. **Configurar el backend** en su máquina
3. **Probar los endpoints** con Swagger
4. **Comenzar el desarrollo** del frontend
5. **Integrar gradualmente** cada funcionalidad

---

## 📚 Recursos Adicionales

- **Swagger UI**: `http://localhost:3000/api-docs`
- **Documentación completa**: `docs/` folder
- **Ejemplos de Docker**: `docker/` folder
- **README principal**: `README.md`

---

**¡El backend está listo para recibir al frontend! 🚀**



