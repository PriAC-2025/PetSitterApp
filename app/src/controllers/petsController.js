const db = require('../models/db');

exports.cadastrarPet = async (req, res) => {
    try {
        const {
            nome,
            tipo,
            raca,
            porte,
            idade,
            cadastrado,
            medicamentos,
            observacoes,
            usuarioId
        } = req.body;

        // Validação mínima
        if (!nome || !tipo || !porte || !usuarioId) {
            return res.status(400).json({ erro: 'Campos obrigatórios não preenchidos.' });
        }

        // Monta query (exemplo genérico para MySQL)
        const sql = `
            INSERT INTO pets (nome, tipo, raca, porte, idade, cadastrado, medicamentos, observacoes, usuarioId)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const valores = [
            nome,
            tipo,
            raca || null,
            porte,
            idade || null,
            cadastrado || 'nao',
            medicamentos || null,
            observacoes || null,
            usuarioId
        ];

        db.query(sql, valores, (err, result) => {
            if (err) {
                console.error('Erro ao inserir pet no banco:', err);
                return res.status(500).json({ erro: 'Erro ao salvar o pet no banco de dados.' });
            }

            return res.status(201).json({ mensagem: 'Pet cadastrado com sucesso!', id: result.insertId });
        });

    } catch (erro) {
        console.error('Erro geral no controller:', erro);
        return res.status(500).json({ erro: 'Erro interno no servidor.' });
    }
};