const express = require('express');
const router = express.Router();
const {
  getCommentsForArticle,
  addComment,
  toggleLike,
  toggleCommentLike,
  getRecentComments,
  getCommentReplies,
  moderateComment
} = require('../controllers/commentController');

/**
 * Rutas para manejar operaciones relacionadas con comentarios
 * Incluye rutas para comentarios de artículos y comentarios independientes
 */

// Rutas para comentarios de artículos específicos
// GET /api/articles/:slug/comments - Obtener comentarios de un artículo
router.get('/articles/:slug/comments', getCommentsForArticle);

// POST /api/articles/:slug/comments - Agregar comentario a un artículo
router.post('/articles/:slug/comments', addComment);

// POST /api/articles/:slug/like - Alternar like en un artículo
router.post('/articles/:slug/like', toggleLike);

// Rutas para comentarios independientes
// GET /api/comments/recent - Obtener comentarios recientes
router.get('/comments/recent', getRecentComments);

// GET /api/comments/:commentId/replies - Obtener respuestas de un comentario
router.get('/comments/:commentId/replies', getCommentReplies);

// POST /api/comments/:commentId/like - Alternar like en un comentario
router.post('/comments/:commentId/like', toggleCommentLike);

// PATCH /api/comments/:commentId/moderate - Moderar comentario (aprobar/desaprobar)
router.patch('/comments/:commentId/moderate', moderateComment);

module.exports = router;
