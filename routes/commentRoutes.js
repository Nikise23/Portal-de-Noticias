const express = require('express');
const router = express.Router();
const {
  getCommentsForArticle,
  addComment,
  getRecentComments
} = require('../controllers/commentController');
const { optionalAuth } = require('../middleware/auth');

/**
 * Rutas para manejar operaciones relacionadas con comentarios
 * Todas las rutas están prefijadas con /api
 */

// GET /api/articles/:slug/comments - Obtener comentarios de un artículo
router.get('/articles/:slug/comments', getCommentsForArticle);

// POST /api/articles/:slug/comments - Agregar comentario a un artículo (autenticación opcional)
router.post('/articles/:slug/comments', optionalAuth, addComment);

// GET /api/comments/recent - Obtener comentarios recientes
router.get('/comments/recent', getRecentComments);

module.exports = router;
