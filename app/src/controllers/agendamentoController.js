const db = require('../models/db');

exports.cadastrarAgendamento = async (req, res) => {
    try {
        const { nomeCachorro, nomeTutor, data, servico, usuarioId } = req.body;

        if (!nomeCachorro || !nomeTutor || !data || !servico || !usuarioId) {
            return res.status(400).json({ erro: 'Todos os campos são obrigatórios.' });
        }

        const sql = `
            INSERT INTO agendamentos (nomeCachorro, nomeTutor, data, servico, usuarioId)
            VALUES (?, ?, ?, ?, ?)
        `;

        const valores = [nomeCachorro, nomeTutor, data, servico, usuarioId];
        const [result] = await db.query(sql, valores);

        res.status(201).json({ mensagem: 'Agendamento realizado com sucesso.', id: result.insertId });
    } catch (erro) {
        console.error('Erro ao cadastrar agendamento:', erro);
        res.status(500).json({ erro: 'Erro interno no servidor.' });
    }
};
