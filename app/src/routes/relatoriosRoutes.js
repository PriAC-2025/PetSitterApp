const express = require('express');
const router = express.Router();
const relatoriosController = require('../controllers/relatoriosController');

// Listar agendamentos
router.get('/', relatoriosController.listarAgendamentosPorPeriodo);

module.exports = router;
