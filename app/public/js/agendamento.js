document.addEventListener('DOMContentLoaded', () => {
    iniciarControleSessao();

    const usuario = obterUsuario();
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

        const agendamento = {
            nomeCachorro: document.getElementById('nome-cachorro').value.trim(),
            nomeTutor: document.getElementById('nome-tutor').value.trim(),
            data: document.getElementById('data').value,
            servico: document.getElementById('servico').value.trim(),
            usuarioId: usuario.id
        };

        if (!agendamento.nomeCachorro || !agendamento.nomeTutor || !agendamento.data || !agendamento.servico) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        try {
            const response = await fetch('http://localhost:3300/api/agendamentos/cadastrar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(agendamento)
            });

            const data = await response.json();

            if (response.ok) {
                alert('Agendamento cadastrado com sucesso!');
                form.reset();
            } else {
                alert(data.erro || 'Erro ao cadastrar agendamento.');
            }
        } catch (error) {
            alert('Erro ao conectar com o servidor.');
            console.error(error);
        }
    });
});
