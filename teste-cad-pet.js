// arquivo testeRequest.js
const fetch = require('node-fetch'); // instale com npm i node-fetch@2 se necessário

(async () => {
  const response = await fetch('http://localhost:3300/api/pets/cadastrarPet', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      nome: "teste",
      tipo: "cachorro",
      raca: "teste",
      porte: "pequeno",
      idade: 3,
      castrado: 1,
      medicamentos: "teste",
      observacoes: "teste",
      usuarioId: 4
    }),
  });

  const data = await response.json();
  console.log(data);
})();
