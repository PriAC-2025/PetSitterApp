const express = require('express');
const router = express.Router();
const relatoriosController = require('../controllers/relatoriosController');

// GET com query params
router.get('/', relatoriosController.listarAgendamentosPorPeriodo);

module.exports = router;
