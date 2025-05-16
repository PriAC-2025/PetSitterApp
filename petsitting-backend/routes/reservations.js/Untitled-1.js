

const express = require('express');
const Reservation = require('../models/Reservation'); 
const { authenticateToken } = require('../middleware/auth');
const router = express.Router();

//Criar reserva

router.post('/', authenticateToken, async (req, res) => {
  const reservation = new Reservation({ ...req.body, user: req.user.id });

  try {
    await reservation.save();
    res.status(201).send('Agendamento criado');
  } catch (error) {
    res.status(400).send('Erro ao criar agendamento');
  }
});

//Todos os agendamentos do usuário

router.get('/', authenticateToken, async (req, res) => {
  const reservations = await Reservation.find({ user: req.user.id });
  res.json(reservations);
});

module.exports = router;
