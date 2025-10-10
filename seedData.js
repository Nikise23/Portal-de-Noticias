const mongoose = require('mongoose');
require('dotenv').config();

// Importar modelos
const Article = require('./models/Article');
const Comment = require('./models/Comment');

/**
 * Script para insertar datos de prueba en la base de datos
 * Ejecutar con: node seedData.js
 */

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`✅ MongoDB conectado: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error('❌ Error de conexión:', error);
    process.exit(1);
  }
};

const sampleArticles = [
  {
    title: "Introducción a Node.js y Express",
    slug: "introduccion-nodejs-express",
    content: `Node.js es un entorno de ejecución de JavaScript del lado del servidor que permite construir aplicaciones web escalables y eficientes. Express es un framework web minimalista y flexible para Node.js que proporciona un conjunto robusto de características para aplicaciones web y móviles.

En este artículo exploraremos los conceptos fundamentales de Node.js y Express, incluyendo:

## Características principales de Node.js
- **Asíncrono y orientado a eventos**: Node.js utiliza un modelo de E/S sin bloqueo
- **JavaScript en el servidor**: Permite usar JavaScript tanto en frontend como backend
- **NPM**: Gestor de paquetes más grande del mundo
- **Alto rendimiento**: Construido sobre el motor V8 de Google Chrome

## Ventajas de Express
- **Minimalista**: Framework ligero y flexible
- **Middleware**: Sistema de middleware extensible
- **Routing**: Sistema de enrutamiento robusto
- **Template engines**: Soporte para múltiples motores de plantillas

## Casos de uso comunes
- APIs REST
- Aplicaciones web en tiempo real
- Microservicios
- Herramientas de línea de comandos

Node.js y Express forman una combinación poderosa para el desarrollo de aplicaciones web modernas.`,
    author: "Profesor Arquitectura Web",
    tags: ["nodejs", "express", "javascript", "backend", "api"],
    likesCount: 15,
    viewsCount: 120
  },
  {
    title: "MongoDB: Base de Datos NoSQL para Aplicaciones Web",
    slug: "mongodb-nosql-aplicaciones-web",
    content: `MongoDB es una base de datos NoSQL orientada a documentos que almacena datos en formato BSON (Binary JSON). Es especialmente útil para aplicaciones web modernas que requieren flexibilidad y escalabilidad.

## ¿Qué es MongoDB?
MongoDB es una base de datos NoSQL que almacena datos en documentos flexibles similares a JSON. A diferencia de las bases de datos relacionales tradicionales, MongoDB no requiere un esquema fijo.

## Características principales
- **Documentos flexibles**: Almacena datos en documentos BSON
- **Escalabilidad horizontal**: Fácil escalado mediante sharding
- **Índices**: Sistema de índices potente para consultas rápidas
- **Agregación**: Pipeline de agregación para análisis complejos
- **Replicación**: Alta disponibilidad con réplicas

## Ventajas para aplicaciones web
- **Desarrollo rápido**: Sin esquemas rígidos
- **Escalabilidad**: Manejo eficiente de grandes volúmenes de datos
- **Flexibilidad**: Cambios de esquema sin migraciones complejas
- **Rendimiento**: Optimizado para lectura y escritura

## Casos de uso ideales
- Sistemas de gestión de contenido
- Aplicaciones de e-commerce
- Análisis de datos en tiempo real
- APIs REST con datos complejos

MongoDB es una excelente opción para aplicaciones web modernas que requieren flexibilidad y rendimiento.`,
    author: "Ingeniero de Software",
    tags: ["mongodb", "nosql", "base-datos", "backend", "escalabilidad"],
    likesCount: 23,
    viewsCount: 180
  },
  {
    title: "Arquitectura de APIs REST: Mejores Prácticas",
    slug: "arquitectura-apis-rest-mejores-practicas",
    content: `Las APIs REST (Representational State Transfer) son fundamentales en el desarrollo web moderno. Una arquitectura bien diseñada puede hacer la diferencia entre una API exitosa y una que cause problemas de mantenimiento.

## Principios fundamentales de REST
- **Stateless**: Cada solicitud debe contener toda la información necesaria
- **Client-Server**: Separación clara entre cliente y servidor
- **Cacheable**: Las respuestas deben ser cacheables cuando sea apropiado
- **Uniform Interface**: Interfaz consistente para todas las interacciones
- **Layered System**: Arquitectura en capas para escalabilidad

## Diseño de endpoints
### Convenciones de URL
- Usar sustantivos, no verbos
- Usar plurales para colecciones
- Mantener jerarquía lógica
- Evitar caracteres especiales

### Métodos HTTP
- **GET**: Obtener recursos
- **POST**: Crear nuevos recursos
- **PUT**: Actualizar recursos completos
- **PATCH**: Actualizaciones parciales
- **DELETE**: Eliminar recursos

## Mejores prácticas
- **Versionado**: Usar versiones en la URL o headers
- **Paginación**: Implementar paginación para listas grandes
- **Filtrado**: Permitir filtros en consultas
- **Ordenamiento**: Soporte para ordenamiento de resultados
- **Manejo de errores**: Códigos de estado HTTP apropiados
- **Documentación**: Documentar todos los endpoints

## Seguridad
- **Autenticación**: Implementar sistemas de autenticación robustos
- **Autorización**: Control de acceso basado en roles
- **Validación**: Validar todos los datos de entrada
- **Rate Limiting**: Limitar solicitudes por usuario/IP

Una API REST bien diseñada es la base de aplicaciones web escalables y mantenibles.`,
    author: "Arquitecto de Software",
    tags: ["api", "rest", "arquitectura", "backend", "mejores-practicas"],
    likesCount: 31,
    viewsCount: 250
  },
  {
    title: "Desarrollo Frontend Moderno con React",
    slug: "desarrollo-frontend-moderno-react",
    content: `React es una biblioteca de JavaScript para construir interfaces de usuario, especialmente aplicaciones de una sola página (SPA). Desarrollada por Facebook, React ha revolucionado el desarrollo frontend moderno.

## ¿Qué es React?
React es una biblioteca que permite crear interfaces de usuario mediante componentes reutilizables. Utiliza un DOM virtual para optimizar el rendimiento y proporciona una experiencia de desarrollo declarativa.

## Características principales
- **Componentes**: Arquitectura basada en componentes reutilizables
- **JSX**: Sintaxis que permite escribir HTML en JavaScript
- **Virtual DOM**: Optimización del rendimiento mediante DOM virtual
- **Unidireccional**: Flujo de datos unidireccional
- **Ecosistema**: Amplio ecosistema de herramientas y librerías

## Conceptos fundamentales
### Componentes
Los componentes son bloques de construcción reutilizables que encapsulan lógica y presentación.

### Props
Las props son datos que se pasan de componentes padre a componentes hijo.

### State
El estado es datos que pueden cambiar durante el ciclo de vida del componente.

### Hooks
Los hooks permiten usar estado y otras características de React en componentes funcionales.

## Ventajas de React
- **Reutilización**: Componentes reutilizables
- **Rendimiento**: Optimizado con Virtual DOM
- **Ecosistema**: Amplio ecosistema de herramientas
- **Comunidad**: Gran comunidad y soporte
- **Flexibilidad**: Puede usarse en diferentes contextos

## Casos de uso
- Aplicaciones web de una sola página
- Interfaces de usuario complejas
- Aplicaciones móviles (React Native)
- Dashboards y aplicaciones de administración

React es una herramienta poderosa para crear interfaces de usuario modernas y eficientes.`,
    author: "Desarrollador Frontend",
    tags: ["react", "frontend", "javascript", "ui", "componentes"],
    likesCount: 28,
    viewsCount: 200
  },
  {
    title: "Integración Frontend-Backend: Comunicación Eficiente",
    slug: "integracion-frontend-backend-comunicacion-eficiente",
    content: `La integración entre frontend y backend es crucial para el éxito de cualquier aplicación web. Una comunicación eficiente entre estas capas puede mejorar significativamente la experiencia del usuario y el rendimiento de la aplicación.

## Modelos de comunicación
### API REST
- **HTTP/HTTPS**: Protocolo estándar para comunicación web
- **JSON**: Formato de intercambio de datos
- **Códigos de estado**: Comunicación del estado de las operaciones
- **Métodos HTTP**: Semántica clara para diferentes operaciones

### WebSockets
- **Conexión persistente**: Comunicación bidireccional en tiempo real
- **Baja latencia**: Ideal para aplicaciones en tiempo real
- **Eventos**: Comunicación basada en eventos

## Mejores prácticas
### Frontend
- **Manejo de estado**: Gestión eficiente del estado de la aplicación
- **Caché**: Implementar estrategias de caché apropiadas
- **Loading states**: Mostrar estados de carga para mejor UX
- **Error handling**: Manejo robusto de errores
- **Optimistic updates**: Actualizaciones optimistas para mejor UX

### Backend
- **Validación**: Validar todos los datos de entrada
- **Autenticación**: Implementar sistemas de autenticación seguros
- **Rate limiting**: Limitar solicitudes para prevenir abuso
- **Logging**: Registrar eventos importantes para debugging
- **Documentación**: Documentar APIs para facilitar integración

## Herramientas de integración
### HTTP Clients
- **Axios**: Cliente HTTP popular para JavaScript
- **Fetch API**: API nativa del navegador
- **jQuery AJAX**: Para aplicaciones legacy

### Estado global
- **Redux**: Gestión de estado predecible
- **Context API**: API nativa de React para estado global
- **Zustand**: Biblioteca ligera para gestión de estado

## Patrones de diseño
- **MVC**: Modelo-Vista-Controlador
- **MVVM**: Modelo-Vista-VistaModelo
- **Flux**: Patrón de arquitectura unidireccional
- **CQRS**: Separación de comandos y consultas

Una integración bien diseñada entre frontend y backend es esencial para aplicaciones web modernas exitosas.`,
    author: "Arquitecto Full Stack",
    tags: ["frontend", "backend", "integracion", "api", "comunicacion"],
    likesCount: 19,
    viewsCount: 150
  }
];

const sampleComments = [
  {
    articleSlug: "introduccion-nodejs-express",
    author: "Estudiante Dev",
    email: "estudiante@universidad.edu",
    content: "Excelente artículo! Muy claro y bien explicado. Me ayudó mucho a entender los conceptos básicos de Node.js."
  },
  {
    articleSlug: "introduccion-nodejs-express",
    author: "Profesor JS",
    email: "profesor@universidad.edu",
    content: "Muy buen contenido. Sugeriría agregar más ejemplos prácticos de middleware en Express."
  },
  {
    articleSlug: "mongodb-nosql-aplicaciones-web",
    author: "DevOps Engineer",
    email: "devops@empresa.com",
    content: "MongoDB es realmente una excelente opción para aplicaciones web modernas. La flexibilidad del esquema es una ventaja enorme."
  },
  {
    articleSlug: "arquitectura-apis-rest-mejores-practicas",
    author: "Senior Developer",
    email: "senior@tech.com",
    content: "Las mejores prácticas mencionadas son fundamentales. El versionado de APIs es algo que muchos desarrolladores pasan por alto."
  },
  {
    articleSlug: "desarrollo-frontend-moderno-react",
    author: "React Enthusiast",
    email: "react@dev.com",
    content: "React ha cambiado completamente la forma en que desarrollo interfaces. Los hooks son una característica increíble."
  }
];

const seedDatabase = async () => {
  try {
    console.log('🌱 Iniciando inserción de datos de prueba...');

    // Limpiar datos existentes
    await Article.deleteMany({});
    await Comment.deleteMany({});
    console.log('🧹 Datos existentes eliminados');

    // Insertar artículos
    const articles = await Article.insertMany(sampleArticles);
    console.log(`✅ ${articles.length} artículos insertados`);

    // Insertar comentarios
    const comments = [];
    for (const commentData of sampleComments) {
      const article = articles.find(a => a.slug === commentData.articleSlug);
      if (article) {
        const comment = await Comment.create({
          articleId: article._id,
          author: commentData.author,
          email: commentData.email,
          content: commentData.content
        });
        comments.push(comment);
      }
    }
    console.log(`✅ ${comments.length} comentarios insertados`);

    // Mostrar resumen
    console.log('\n📊 Resumen de datos insertados:');
    console.log(`- Artículos: ${articles.length}`);
    console.log(`- Comentarios: ${comments.length}`);
    console.log('\n🎉 Base de datos poblada exitosamente!');
    console.log('\n🔗 Puedes probar la API en:');
    console.log('- http://localhost:3000/api/articles');
    console.log('- http://localhost:3000/api/articles/introduccion-nodejs-express');
    console.log('- http://localhost:3000/api/articles/introduccion-nodejs-express/comments');

  } catch (error) {
    console.error('❌ Error al insertar datos:', error);
  } finally {
    // Cerrar conexión
    await mongoose.connection.close();
    console.log('🔒 Conexión cerrada');
    process.exit(0);
  }
};

// Ejecutar script
const runSeed = async () => {
  await connectDB();
  await seedDatabase();
};

runSeed();
