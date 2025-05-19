console.log('Executando server.js');
console.log('process.env.PORT:', process.env.PORT);


const express = require('express');
const cors = require('cors');

const app = express();

// Força usar porta 3300, independentemente de variável ambiente
const PORT = 3300;

app.use(cors());
app.use(express.json());

const authRoutes = require('./app/src/routes/authRoutes');
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
