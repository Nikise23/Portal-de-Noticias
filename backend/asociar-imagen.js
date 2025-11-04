/**
 * Script simple para asociar una imagen a un artículo
 * 
 * Uso:
 * node asociar-imagen.js <nombre-imagen> <slug-articulo>
 * 
 * Ejemplo:
 * node asociar-imagen.js tecnologia-2025.jpg tecnologia-avances-2025
 */

require('dotenv').config();
const mongoose = require('mongoose');
const Article = require('./models/Article');
const connectDB = require('./config/db');

// Conectar a la base de datos
connectDB();

async function asociarImagen(nombreImagen, slugArticulo) {
  try {
    // Construir la URL de la imagen
    const imagenUrl = `/uploads/images/${nombreImagen}`;
    
    // Buscar el artículo por slug
    const article = await Article.findOne({ slug: slugArticulo.toLowerCase().trim() });

    if (!article) {
      console.error(`❌ Artículo con slug "${slugArticulo}" no encontrado`);
      console.log('\n💡 Artículos disponibles en la base de datos:');
      const articles = await Article.find({}).select('slug title').limit(10);
      articles.forEach(a => console.log(`   - ${a.slug}: "${a.title}"`));
      process.exit(1);
    }

    // Actualizar la imagen
    article.imagenUrl = imagenUrl;
    await article.save();

    console.log('\n✅ Imagen asociada exitosamente!');
    console.log(`📰 Artículo: ${article.title}`);
    console.log(`🔗 Slug: ${article.slug}`);
    console.log(`🖼️  Imagen: ${imagenUrl}`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error al asociar imagen:', error.message);
    process.exit(1);
  }
}

// Obtener argumentos de la línea de comandos
const args = process.argv.slice(2);

if (args.length < 2) {
  console.log('\n📖 Uso: node asociar-imagen.js <nombre-imagen> <slug-articulo>');
  console.log('\n📝 Ejemplo:');
  console.log('   node asociar-imagen.js tecnologia-2025.jpg tecnologia-avances-2025');
  console.log('\n💡 Nota: El nombre de la imagen debe estar en backend/uploads/images/');
  process.exit(1);
}

const [nombreImagen, slugArticulo] = args;

// Esperar a que se conecte MongoDB antes de actualizar
setTimeout(() => {
  asociarImagen(nombreImagen, slugArticulo);
}, 2000);

