

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const uri = process.env.MONGODB_URI;
const jwtSecret = process.env.JWT_SECRET;
const jwt = require('jsonwebtoken');
const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

//Conectar com o MongoDB 

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Conectado ao MongoDB'))
.catch(err => console.error('Erro ao conectar ao MongoDB', err));

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB conectado'))
    .catch(err => console.error('Erro ao conectar ao MongoDB:', err));

//Middleware uso de JSON

app.use(express.json());

//Importar rotas

const authRoutes = require('./routes/auth'); 
const petsRoutes = require('./routes/pets'); 
const petsittersRoutes = require('./routes/petsitters'); 
const reservationsRoutes = require('./routes/reservations');
const reviewsRoutes = require('./routes/reviews');
const usersRoutes = require('./routes/users'); 

//Usar rotas

app.use('/api/auth', authRoutes);
app.use('/api/pets', petsRoutes);
app.use('/api/petsitters', petsittersRoutes);
app.use('/api/reservations', reservationsRoutes);
app.use('/api/reviews', reviewsRoutes);
app.use('/api/users', usersRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});


