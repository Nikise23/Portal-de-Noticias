const express = require('express');
const router = express.Router();
const {
  getAllArticles,
  getArticleBySlug,
  searchArticles,
  getPopularArticles,
  getArticlesByTag,
  getAllTags,
  getBlogStats,
  toggleLike,
  getArticleLikes
} = require('../controllers/articleController');
const { authenticateToken, optionalAuth } = require('../middleware/auth');

/**
 * Rutas para manejar operaciones relacionadas con artículos
 * Todas las rutas están prefijadas con /api/articles
 */

// GET /api/articles - Obtener todos los artículos con paginación y filtros
router.get('/', getAllArticles);

// GET /api/articles/search - Buscar artículos por texto
router.get('/search', searchArticles);

// GET /api/articles/popular - Obtener artículos populares
router.get('/popular', getPopularArticles);

// GET /api/articles/tags - Obtener todos los tags únicos
router.get('/tags', getAllTags);

// GET /api/articles/stats - Obtener estadísticas del blog
router.get('/stats', getBlogStats);

// GET /api/articles/tag/:tag - Obtener artículos por tag específico
router.get('/tag/:tag', getArticlesByTag);

// GET /api/articles/:slug - Obtener artículo específico por slug
router.get('/:slug', optionalAuth, getArticleBySlug);

// POST /api/articles/:slug/like - Dar o quitar like a un artículo (requiere autenticación)
router.post('/:slug/like', authenticateToken, toggleLike);

// GET /api/articles/:slug/likes - Obtener usuarios que dieron like a un artículo
router.get('/:slug/likes', getArticleLikes);

module.exports = router;

