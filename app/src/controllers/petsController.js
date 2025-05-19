const db = require('../models/db');

exports.cadastrarPet = async (req, res) => {
    try {
        const {
            nome,
            tipo,
            raca,
            porte,
            idade,
            castrado,
            medicamentos,
            observacoes,
            usuarioId
        } = req.body;

        if (!nome || !tipo || !porte || !usuarioId) {
            return res.status(400).json({ erro: 'Campos obrigatórios não preenchidos.' });
        }

        const sql = `
            INSERT INTO pets (nome, tipo, raca, porte, idade, castrado, medicamentos, observacoes, usuarioId)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const valores = [
            nome,
            tipo,
            raca || null,
            porte,
            idade ?? null,
            castrado ?? null,
            medicamentos || null,
            observacoes || null,
            usuarioId
        ];

        const [result] = await db.query(sql, valores);

        return res.status(201).json({ mensagem: 'Pet cadastrado com sucesso!', id: result.insertId });

    } catch (erro) {
        console.error('Erro geral no controller:', erro);
        return res.status(500).json({ erro: 'Erro interno no servidor.' });
    }
};

exports.listarPetsPorUsuario = (req, res) => {
    const usuarioId = req.params.usuarioId;

    if (!usuarioId) {
        return res.status(400).json({ erro: 'ID do usuário não informado.' });
    }

    const sql = 'SELECT * FROM pets WHERE usuarioId = ?';

    db.query(sql, [usuarioId], (err, resultados) => {
        if (err) {
            console.error('Erro ao buscar pets:', err);
            return res.status(500).json({ erro: 'Erro ao buscar pets.' });
        }

        res.json(resultados);
    });
};

