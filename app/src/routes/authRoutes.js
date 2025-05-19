const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Rota de login: POST /api/auth/login
router.post('/login', authController.login);
// Rota de cadastro: POST /api/auth/cadastro
router.post('/cadastro', authController.cadastro);

module.exports = router;