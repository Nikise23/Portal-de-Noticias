# 1. Decisiones Arquitectónicas y Justificación

## 1.1 Frontend

**Framework / Stack elegido:**
- **Vue 3 con Composition API:** modular, reactivo y de fácil mantenimiento.  
- **Vite** como bundler y servidor de desarrollo rápido (hot reload, compatibilidad con Vue 3).  
- **Lenguaje:** JavaScript moderno (ES6+).  
- **Gestor de dependencias:** npm.   

**Componentes principales:**
- `HomePortal.vue`: página principal que consume los artículos de la API.  
- `RegistroView.vue` y `InicioSesionView.vue`: manejo de autenticación.  
- `ArticuloCard.vue`: tarjetas reutilizables para mostrar artículos.  
- `PortalHeader.vue`: encabezado con navegación y botones de login/registro.  

**Estrategia de renderizado:**
- **CSR (Client-Side Rendering):** la aplicación se carga en el navegador y realiza *fetch* a la API para obtener datos dinámicos.  
- **Justificación:** el portal es informativo, con datos cambiantes provenientes de la API, por lo que no requiere pre-renderizado en servidor.  
- **Ventaja:** experiencia fluida y dinámica; SPA (*Single Page Application*) ligera y rápida.  

**Gestión de rutas y estado:**
- **Vue Router:** rutas principales `/`, `/registro`, `/iniciar-sesion`, `/articulo/`.  
- **Estados locales:** con `ref` y `computed`; no se usa actualmente Vuex o Pinia.  
- **Variables de entorno:** `.env` con `VITE_API_URL` para configurar URL del backend.  

---

## 1.2 Backend

**Stack / Lenguaje:**
- **Node.js + Express**  
- **Base de datos:** MongoDB Atlas (`blog_interactivo`).  

**Estilo de API:**
- **REST API** consumida por el frontend.  
- **Endpoints principales:**
  - `GET /api/articles` → Obtiene todos los artículos, permite *query params* como `limit` o `page`.  
  - `GET /api/articles/:slug` → Obtiene un artículo específico por su *slug*.  
  - `POST /api/auth/login` → Login de usuarios, devuelve JWT.  
  - `POST /api/auth/register` → Registro de usuarios.  

**Patrones de arquitectura aplicados:**
- **Modelo-Vista-Controlador (MVC):**
  - **Modelo:** esquemas Mongoose para `articles` y `users`.  
  - **Controlador:** funciones que manejan la lógica de negocio y consultas a la DB.  
  - **Rutas:** definen endpoints REST y llaman a controladores.  

**Función del backend:**
- Recibir peticiones del frontend.  
- Procesar la lógica de negocio: autenticación, autorización y manejo de artículos.  
- Consultar MongoDB y devolver resultados en formato JSON.  

---

## 1.3 Base de Datos

**Motor:** MongoDB Atlas (cluster `blog_interactivo`).  

**Colecciones principales:**
- `articles` → almacenamiento de artículos con campos como `_id`, `title`, `slug`, `author`, `tags`, `likesCount`, `viewsCount`, `publishedAt`, `excerpt`, `imagenUrl`.  
- `users` → usuarios registrados con correo, contraseña (hashed) y roles si aplica.  

**Función:** almacenar y devolver datos solicitados por el backend, garantizando persistencia y seguridad.  

---

# 2. Arquitectura de la Aplicación

**Modelo:** Arquitectura de 3 capas  

### 1. Capa de presentación (Frontend)
- Vue 3 + Composition API.  
- Componentes principales y consumo de API REST.  
- Renderizado CSR con *fetch* dinámico de artículos.  

### 2. Capa de lógica de negocio (Backend / API)
- Node.js + Express.  
- REST API con endpoints gestionados por controladores.  
- JWT para autenticación y middleware para manejo de errores.  

### 3. Capa de datos (Base de datos)
- MongoDB Atlas, almacenamiento de artículos y usuarios.  
- Acceso mediante Mongoose desde el backend.  

---

# 3. Flujo de datos

1. Usuario abre la aplicación → Vue renderiza SPA (`HomePortal.vue`).  
2. Frontend hace *fetch* a `${API_URL}/api/articles?limit=15`.  
3. Backend recibe la petición → consulta MongoDB (colección `articles`).  
4. MongoDB devuelve los artículos → backend genera JSON y lo envía al frontend.  
5. Frontend asigna los artículos a:
   - `articuloDestacado` → primer artículo.  
   - `articulosPrincipales` → artículos 2 y 3.  
   - `feedArticulos` → artículos 4 y 5.  
   - `articulosFilaInferior` → resto de artículos.  
6. Vue renderiza los artículos en pantalla.  

---

# 4. Despliegue y DevOps

**Frontend y Backend:**
- Ambas capas están desplegadas en **Render**  
  👉 [https://portal-de-noticiasa5iu.onrender.com](https://portal-de-noticiasa5iu.onrender.com)  
- El frontend (Vue 3) apunta al backend real mediante la variable de entorno `VITE_API_URL`.  
- El backend (Node.js + Express) se conecta a MongoDB Atlas usando `MONGODB_URI` para obtener artículos y usuarios.  

**Variables de entorno configuradas en Render:**
- `MONGODB_URI` → conexión a la base de datos MongoDB Atlas.  
- `JWT_SECRET` → clave para autenticación JWT.  
- `PORT` → puerto en el que corre el backend.  
- `VITE_API_URL` → URL del backend que consume el frontend.  

**Proceso de despliegue:**

### 1. Frontend:
- Build de producción con `npm run build` → carpeta `dist/`.  
- Archivos estáticos servidos por Render o un servidor Nginx en contenedor Docker (planeado).  
- La SPA realiza *fetch* dinámico a la API para mostrar artículos.  

### 2. Backend:
- Deploy en Render apuntando al proyecto Node.js.  
- Conexión segura a MongoDB Atlas mediante `MONGODB_URI`.  
- Escucha peticiones en el `PORT` configurado.  
- Endpoints REST listos para consumo por el frontend.  

---

# 5. Depuración y Consola

**Se incluyen `console.log` en `HomePortal.vue` para verificar:**
- URL de API (`API_URL`).  
- Respuesta de la API.  
- Asignación de artículos (`articuloDestacado`, `articulosPrincipales`, etc.).  

**Mensajes de pantalla si no hay datos:**
- “No se encontró artículo destacado”  
- “No se encontraron artículos principales”  
- “No se encontraron artículos de feed”  
- “No se encontraron artículos en la fila inferior”

# 6. Versión PDF

👉 [Clic acá](https://drive.google.com/file/d/1UWGPSXwEDNejUqi1GhR9prsigp5STFEk/view?usp=drive_link)
