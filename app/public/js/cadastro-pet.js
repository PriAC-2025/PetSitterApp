document.addEventListener('DOMContentLoaded', () => {
    iniciarControleSessao();

    const usuario = obterUsuario();
    console.log('Usuário obtido da sessão:', usuario);

    if (!usuario || !usuario.id) {
        alert('Você precisa estar logado para acessar esta página.');
        window.location.href = 'login.html';
        return;
    }

    const form = document.querySelector('.formulario');
    if (!form) {
        console.error('Formulário não encontrado.');
        return;
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        renovarSessao();

        const pet = {
            nome: document.getElementById('nome-pet').value.trim(),
            tipo: document.getElementById('tipo-pet').value,
            raca: document.getElementById('raca').value.trim(),
            porte: document.getElementById('porte').value,
            idade: parseInt(document.getElementById('idade').value) || null,
            castrado: document.getElementById('castrado').checked ? 1 : 0,  // Corrigido aqui
            medicamentos: document.getElementById('medicamentos').value.trim(),
            observacoes: document.getElementById('observacoes').value.trim(),
            usuarioId: usuario.id
        };

        if (!pet.nome || !pet.tipo || !pet.porte) {
            alert('Por favor, preencha os campos obrigatórios: Nome, Tipo e Porte.');
            return;
        }

        try {
            const response = await fetch('http://localhost:3300/api/pets/cadastrarPet', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(pet),
            });

            let data;
try {
    data = await response.json();
} catch (e) {
    console.error('Erro ao parsear JSON:', e);
    data = { erro: 'Resposta inválida do servidor.' };
}


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
