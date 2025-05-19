const db = require('../models/db');

exports.cadastrarPet = async (req, res) => {
    try {
        const {
            nome,
            tipo,
            raca,
            porte,
            idade,
            castrado, // corrigido de "cadastrado" para "castrado"
            medicamentos,
            observacoes,
            usuarioId
        } = req.body;

        // Validação mínima: apenas nome, tipo, porte e usuarioId são obrigatórios
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
            idade ?? null, // usa null se não for informado ou se for zero
            castrado ?? null, // aceita 0, 1 ou null
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

