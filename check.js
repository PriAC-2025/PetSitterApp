// test-db.js
const mysql = require('mysql2/promise');

async function testarConexao() {
  try {
    const conn = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'root',
      database: 'petsitter_db'
    });
    console.log('Conexão bem-sucedida!');
    await conn.end();
  } catch (err) {
    console.error('Erro de conexão:', err);
  }
}

testarConexao();
