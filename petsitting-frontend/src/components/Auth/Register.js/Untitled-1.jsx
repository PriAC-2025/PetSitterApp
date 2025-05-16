

import React, { useState } from 'react';
import api from '../../services/api';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/register', { username, password });
      alert('Usuário registrado com sucesso!');
    } catch (error) {
      console.error("Erro ao cadastrar: ", error);
      alert('Erro ao cadastrar. Tente novamente.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nome de Usuário"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Registrar</button>
    </form>
  );
};

export default Register;
