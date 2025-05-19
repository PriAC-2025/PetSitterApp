const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Força usar porta 3300, independentemente de variável ambiente
const PORT = 3300;

const authRoutes = require('./app/src/routes/authRoutes');
app.use('/api/auth', authRoutes);


const petsRoutes = require('./app/src/routes/petsRoutes');
app.use('/api/pets', petsRoutes); //

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
