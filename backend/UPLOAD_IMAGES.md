# Guía para Subir Imágenes de Artículos

## 📍 Ubicación de las Imágenes

Las imágenes se almacenan en:
```
backend/uploads/images/
```

## 🚀 Cómo Subir Imágenes

### Opción 1: Usando el Endpoint de la API

**Endpoint:** `POST /api/upload/image`

**Formato:** `multipart/form-data`

**Campo del formulario:** `image`

**Ejemplo con cURL:**
```bash
curl -X POST http://localhost:3000/api/upload/image \
  -F "image=@/ruta/a/tu/imagen.jpg"
```

**Ejemplo con JavaScript/Fetch:**
```javascript
const formData = new FormData();
formData.append('image', fileInput.files[0]);

const response = await fetch('http://localhost:3000/api/upload/image', {
  method: 'POST',
  body: formData
});

const result = await response.json();
console.log(result.data.imageUrl); // Ej: /uploads/images/imagen-1234567890.jpg
```

**Respuesta exitosa:**
```json
{
  "success": true,
  "message": "Imagen subida exitosamente",
  "data": {
    "imageUrl": "/uploads/images/imagen-1234567890.jpg",
    "filename": "imagen-1234567890.jpg",
    "originalName": "mi-imagen.jpg",
    "size": 123456,
    "mimetype": "image/jpeg"
  }
}
```

### Opción 2: Subir Manualmente al Directorio

1. **Coloca las imágenes directamente en:**
   ```
   backend/uploads/images/
   ```

2. **Usa nombres descriptivos:**
   - Ejemplo: `tecnologia-2025.jpg`, `politica-economia.png`

3. **La URL de la imagen será:**
   ```
   /uploads/images/nombre-del-archivo.jpg
   ```

4. **Actualiza el artículo en la base de datos:**
   ```javascript
   // Ejemplo con MongoDB
   db.articles.updateOne(
     { slug: "tu-articulo-slug" },
     { $set: { imagenUrl: "/uploads/images/nombre-del-archivo.jpg" } }
   )
   ```

## 📝 Asociar Imagen a un Artículo

Una vez que tienes la URL de la imagen, puedes asociarla a un artículo de dos formas:

### 1. Al crear/actualizar un artículo (si tienes endpoint para eso)

El campo `imagenUrl` en el modelo Article ahora acepta la URL de la imagen.

### 2. Actualizando directamente en la base de datos

```javascript
// Usando MongoDB Compass o Mongoose
Article.findOneAndUpdate(
  { slug: 'mi-articulo-slug' },
  { imagenUrl: '/uploads/images/mi-imagen.jpg' },
  { new: true }
);
```

## ✅ Requisitos de las Imágenes

- **Formatos aceptados:** JPG, JPEG, PNG, GIF, WebP
- **Tamaño máximo:** 5MB
- **Recomendado:** 
  - Resolución: 1200x800px o similar
  - Formato: JPG o WebP para mejor compresión
  - Peso: Menos de 500KB para mejor rendimiento

## 🔗 URLs de las Imágenes

Las imágenes subidas estarán disponibles en:
```
http://localhost:3000/uploads/images/nombre-archivo.jpg
```

En el frontend, usa:
```javascript
// En ArticuloCard.vue o ArticuloDetalle.vue
:src="articulo.imagenUrl || '/default-image.jpg'"
```

## 📂 Estructura de Directorios

```
backend/
├── uploads/
│   └── images/          ← Aquí van las imágenes
│       ├── imagen-1.jpg
│       ├── imagen-2.png
│       └── ...
├── middleware/
│   └── upload.js        ← Configuración de multer
├── controllers/
│   └── uploadController.js  ← Controlador de subida
└── routes/
    └── uploadRoutes.js      ← Rutas de subida
```

## 🛠️ Solución de Problemas

### Error: "No se proporcionó ningún archivo"
- Verifica que el campo del formulario se llame `image`
- Asegúrate de usar `multipart/form-data` en el Content-Type

### Error: "Solo se permiten archivos de imagen"
- Verifica que el archivo sea una imagen válida
- Formatos aceptados: jpg, jpeg, png, gif, webp

### Error: "Archivo demasiado grande"
- El tamaño máximo es 5MB
- Comprime la imagen antes de subirla

### La imagen no se muestra
- Verifica que el servidor esté sirviendo archivos estáticos desde `/uploads`
- Verifica que la ruta en `imagenUrl` sea correcta (debe empezar con `/uploads/images/`)

## 📚 Ejemplo Completo

```javascript
// 1. Subir imagen
const formData = new FormData();
formData.append('image', document.getElementById('fileInput').files[0]);

const uploadResponse = await fetch('http://localhost:3000/api/upload/image', {
  method: 'POST',
  body: formData
});

const uploadResult = await uploadResponse.json();
const imageUrl = uploadResult.data.imageUrl; // Ej: /uploads/images/imagen-123.jpg

// 2. Crear artículo con la imagen
const articleResponse = await fetch('http://localhost:3000/api/articles', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: 'Mi Artículo',
    slug: 'mi-articulo',
    content: 'Contenido del artículo...',
    author: 'Autor',
    imagenUrl: imageUrl, // URL de la imagen subida
    tags: ['tecnologia', 'noticias']
  })
});
```


