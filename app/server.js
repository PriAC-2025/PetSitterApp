const express = require('express');
const cors = require('cors');
const db = require('./dbmysql');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); // ('public'))



// rota login
app.post('/script_login', (req, res) => {
    const { email, senha } = req.body;

    const sql = 'SELECT * FROM cadastro WHERE email = ? AND senha = ?';
    db.query(sql, [email, senha], (err, results) => {
        if (err) {
            console.error('Erro ao consultar:', err);
            return res.status(500).json({ erro: 'Erro interno no servidor' });
        }

        if (results.length > 0) {
            return res.json({ mensagem: 'Login bem-sucedido!' });
        } else {
            return res.status(401).json({ erro: 'Email ou senha incorretos' });
        }
    });
});

app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});
