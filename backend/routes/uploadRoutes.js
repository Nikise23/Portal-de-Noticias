const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { uploadImage } = require('../controllers/uploadController');

/**
 * Rutas para manejar subida de archivos
 * Todas las rutas están prefijadas con /api/upload
 */

// POST /api/upload/image - Subir imagen
// El middleware upload.single('image') maneja la subida del archivo
router.post('/image', upload.single('image'), uploadImage);

module.exports = router;

