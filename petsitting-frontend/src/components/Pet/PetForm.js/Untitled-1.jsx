

import React, { useState } from 'react';
import api from '../../services/api';

const PetForm = () => {
  const [petData, setPetData] = useState({
    name: '',
    age: '',
    specie: '',
    breed: '',
    castrated: false,
    medication: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPetData({ ...petData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/pets', petData);
      alert('Pet cadastrado com sucesso!');
    } catch (error) {
      console.error("Erro ao cadastrar pet: ", error);
      alert('Erro ao cadastrar pet. Tente novamente.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        value={petData.name}
        onChange={handleChange}
        placeholder="Nome do Pet"
        required
      />
      <input
        name="age"
        value={petData.age}
        onChange={handleChange}
        placeholder="Idade do Pet"
        required
      />
      <input
        name="specie"
        value={petData.specie}
        onChange={handleChange}
        placeholder="Espécie do Pet"
        required
      />
      <input
        name="breed"
        value={petData.breed}
        onChange={handleChange}
        placeholder="Raça do Pet"
        required
      />
      <label>
        Castrado:
        <input
          type="checkbox"
          name="castrated"
          checked={petData.castrated}
          onChange={(e) => setPetData({ ...petData, castrated: e.target.checked })}
        />
      </label>
      <input
        name="medication"
        value={petData.medication}
        onChange={handleChange}
        placeholder="Medicação"
      />
      <button type="submit">Cadastrar Pet</button>
    </form>
  );
};

export default PetForm;
