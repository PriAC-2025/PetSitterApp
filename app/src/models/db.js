const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',          // Usuário que funcionou no teste
  password: 'root',      // Senha que funcionou no teste
  database: 'petsitter_db', // Nome do banco que você criou
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;