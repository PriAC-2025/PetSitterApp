const db = require('./app/src/models/db');

async function testConnection() {
  try {
    const [rows] = await db.query('SELECT 1 + 1 AS result');
    console.log('Conexão com banco OK, resultado:', rows[0].result);
  } catch (err) {
    console.error('Erro de conexão:', err);
  }
}

testConnection();
