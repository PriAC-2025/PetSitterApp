

const express = require('express');
const User = require('../models/User');
const { authenticateToken } = require('../middleware/auth');
const router = express.Router();

//Perfil do usuário

router.get('/me', authenticateToken, async (req, res) => {
  const user = await User.findById(req.user.id);
  res.json(user);
});

//Atualizar perfil do usuário

router.put('/me', authenticateToken, async (req, res) => {
  const { username } = req.body;

  try {
    await User.findByIdAndUpdate(req.user.id, { username });
    res.send('Perfil atualizado com sucesso');
  } catch (error) {
    res.status(400).send('Erro ao atualizar perfil');
  }
});

module.exports = router;
