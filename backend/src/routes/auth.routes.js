const { Router } = require('express');
const { login, renewToken } = require('../controllers/auth.controller');
const { validateJWT } = require('../middleware/validateJWT');

const router = Router();

/**
 * RUTA: POST /api/auth/login
 * PÚBLICA: Para obtener el token inicial
 */
router.post('/login', login);

/**
 * RUTA: GET /api/auth/renew
 * PRIVADA: Requiere x-token en los headers
 */
router.get('/renew', validateJWT, renewToken);

module.exports = router;