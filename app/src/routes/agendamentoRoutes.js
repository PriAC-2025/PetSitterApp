const express = require('express');
const router = express.Router();
const agendamentoController = require('../controllers/agendamentoController');

// Rota para cadastrar agendamento
router.post('/cadastrar', agendamentoController.cadastrarAgendamento);

module.exports = router;
