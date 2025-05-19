const express = require('express');
const router = express.Router();
const petsController = require('../controllers/petsController');

// Rota para cadastro de pet
router.post('/cadastrarPet', petsController.cadastrarPet);

// Rota para listar pets do Usuario
router.get('/listarPets/:usuarioId', petsController.listarPetsPorUsuario);

module.exports = router;
