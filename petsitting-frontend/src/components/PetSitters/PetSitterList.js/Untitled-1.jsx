

import React, { useEffect, useState } from 'react';
import api from '../../services/api';

const PetsitterList = () => {
  const [petsitters, setPetsitters] = useState([]);

  useEffect(() => {
    const fetchPetsitters = async () => {
      try {
        const response = await api.get('/petsitters');
        setPetsitters(response.data);
      } catch (error) {
        console.error("Erro de busca: ", error);
      }
    };
    fetchPetsitters();
  }, []);

  return (
    <div>
      <h2>Petsitters Disponíveis</h2>
      <ul>
        {petsitters.map(petsitter => (
          <li key={petsitter.id}>
            <h3>{petsitter.name}</h3>
            <p>Avaliação: {petsitter.rating}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PetsitterList;
