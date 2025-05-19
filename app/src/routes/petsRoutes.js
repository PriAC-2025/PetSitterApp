const express = require('express');
const router = express.Router();
const petsController = require('../controllers/petsController');

// Rota para cadastro de pet
router.post('/cadastrarPet', petsController.cadastrarPet);

module.exports = router;
