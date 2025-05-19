const db = require('../models/db');

async function cadastro(req, res) {
    console.log('Recebido cadastro:', req.body);

    const { nome, email, senha, endereco, telefone } = req.body;

    if (!nome || !email || !senha) {
        return res.status(400).json({
            sucesso: false,
            erro: 'Campos obrigatórios faltando',
            camposFaltando: { nome: !nome, email: !email, senha: !senha }
        });
    }

    try {
        const [usuarios] = await db.query(
            'SELECT id FROM users WHERE email = ?',
            [email]
        );

        if (usuarios.length > 0) {
            return res.status(409).json({
                sucesso: false,
                erro: 'E-mail já cadastrado'
            });
        }

        // Senha salva em texto puro (somente para fins de estudo)
        const [result] = await db.query(
            `INSERT INTO users (nome_completo, email, senha, endereco, telefone)
            VALUES (?, ?, ?, ?, ?)`,
            [nome, email, senha, endereco || null, telefone || null]
        );

        return res.status(201).json({
            sucesso: true,
            mensagem: 'Usuário cadastrado com sucesso',
            user: {
                id: result.insertId,
                nome_completo: nome,
                email
            }
        });

    } catch (error) {
        console.error('Erro no cadastro:', error);

        if (error.code === 'ECONNREFUSED') {
            return res.status(503).json({
                sucesso: false,
                erro: 'Serviço indisponível',
                detalhes: 'Não foi possível conectar ao banco de dados'
            });
        }

        return res.status(500).json({
            sucesso: false,
            erro: 'Erro interno do servidor',
            detalhes: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}


async function login(req, res) {
    res.setHeader('Content-Type', 'application/json');

    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({
            sucesso: false,
            erro: 'E-mail e senha são obrigatórios'
        });
    }

    try {
        const [usuarios] = await db.query(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );

        const usuario = usuarios[0];

        if (!usuario) {
            return res.status(401).json({
                sucesso: false,
                erro: 'Credenciais inválidas'
            });
        }

        const senhaCorreta = senha === usuario.senha;

        if (!senhaCorreta) {
            return res.status(401).json({
                sucesso: false,
                erro: 'Credenciais inválidas'
            });
        }

        return res.status(200).json({
            sucesso: true,
            mensagem: 'Login realizado com sucesso',
            user: {
                id: usuario.id,
                nome_completo: usuario.nome_completo,
                email: usuario.email
            }
        });

    } catch (error) {
        console.error('Erro no login:', error);
        return res.status(500).json({
            sucesso: false,
            erro: 'Erro interno do servidor'
        });
    }
}


module.exports = {
    cadastro,
    login
};
