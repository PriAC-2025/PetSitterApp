document.addEventListener('DOMContentLoaded', async () => {
    const usuario = obterUsuario ? obterUsuario() : null;

    if (!usuario || !usuario.id) {
        alert('Você precisa estar logado para acessar esta página.');
        window.location.href = 'login.html';
        return;
    }

    try {
        const response = await fetch(`http://localhost:3300/api/pets/listarPets/${usuario.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Erro ao buscar os pets do usuário. Status: ' + response.status);
        }

        const pets = await response.json();

        const listaPets = document.getElementById('lista-pets');
        listaPets.innerHTML = '';

        if (!pets || pets.length === 0) {
            listaPets.innerHTML = '<p>Você ainda não cadastrou nenhum pet.</p>';
            return;
        }

        pets.forEach(pet => {
            const petCard = document.createElement('div');
            petCard.classList.add('pet-card');
            petCard.innerHTML = `
                <h3>${pet.nome}</h3>
                <p><strong>Tipo:</strong> ${pet.tipo}</p>
                <p><strong>Raça:</strong> ${pet.raca || '-'}</p>
                <p><strong>Porte:</strong> ${pet.porte}</p>
                <p><strong>Idade:</strong> ${pet.idade ? pet.idade + ' anos' : '-'}</p>
                <div style="text-align: right; margin-top: 1rem;">
                    <button class="botao-acao">Editar</button>
                    <button class="botao-acao" style="background-color: #dc3545;">Remover</button>
                </div>
            `;
            listaPets.appendChild(petCard);
        });
    } catch (error) {
        alert(error.message);
        console.error(error);
    }
});
