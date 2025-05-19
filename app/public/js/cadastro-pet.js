


document.addEventListener('DOMContentLoaded', () => {
    iniciarControleSessao();
    const form = document.querySelector('.formulario');

    

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const usuario = obterUsuario();
        window.iniciarControleSessao();

        if (!usuario || !usuario.id) {
            alert('Você precisa estar logado para cadastrar um pet.');
            window.location.href = 'login.html';
            return;
        }

        const pet = {
            nome: document.getElementById('nome-pet').value.trim(),
            tipo: document.getElementById('tipo-pet').value,
            raca: document.getElementById('raca').value.trim(),
            porte: document.getElementById('porte').value,
            idade: parseInt(document.getElementById('idade').value),
            cadastrado: document.getElementById('cadastrado').value,
            medicamentos: document.getElementById('medicamentos').value.trim(),
            observacoes: document.getElementById('observacoes').value.trim(),
            usuarioId: usuario.id
        };

        if (!pet.nome || !pet.tipo || !pet.porte || !pet.cadastrado) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        try {
            const response = await fetch('http://localhost:3300/api/auth/cadastrarPet', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(pet),
            });

            const data = await response.json();

            if (response.ok) {
                alert('Pet cadastrado com sucesso!');
                form.reset();
            } else {
                alert(data.erro || 'Erro ao cadastrar pet.');
            }
        } catch (error) {
            alert('Erro ao conectar com o servidor.');
            console.error(error);
        }
        
    });
});
