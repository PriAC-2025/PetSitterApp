const db = require('../models/db');

exports.listarAgendamentosPorPeriodo = async (req, res) => {
  try {
    const { dataInicio, dataFim } = req.query;

    if (!dataInicio || !dataFim) {
      return res.status(400).json({ error: 'Parâmetros dataInicio e dataFim são obrigatórios.' });
    }

    const inicio = new Date(dataInicio);
    const fim = new Date(dataFim);

    if (isNaN(inicio) || isNaN(fim)) {
      return res.status(400).json({ error: 'Datas inválidas.' });
    }

    const query = `
      SELECT nomeCachorro, nomeTutor, data, servico, usuarioId
      FROM Agendamentos
      WHERE data BETWEEN ? AND ?
      ORDER BY data ASC
    `;

    const [rows] = await db.query(query, [dataInicio, dataFim]);

    return res.json(rows);
  } catch (error) {
    console.error('Erro ao buscar agendamentos:', error);
    return res.status(500).json({
      error: 'Erro interno ao listar agendamentos.',
      message: error.message,
      stack: error.stack
    });
  }
};
