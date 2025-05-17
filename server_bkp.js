
const express = require('express');
const cors = require('cors');
const db = require('./dbmysql');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public')); // Serve index.html, cadastro.html, etc.

app.get('/', (req, res) => {
    res.send('API funcionando!');
});

app.post('/cadastro', (req, res) => {
    const { nome, email, endereco, senha } = req.body;
    const sql = 'INSERT INTO cadastro (nome, email, endereco, senha) VALUES (?, ?, ?, ?)';

    db.query(sql, [nome, email, endereco, senha], (err, result) => {
        if (err) {
            console.error('Erro ao inserir:', err);
            return res.status(500).json({ erro: 'Erro ao inserir no banco' });
        }
        res.json({ mensagem: 'Cadastro realizado com sucesso!' });
    });
});

app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});