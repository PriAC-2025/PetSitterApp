document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('cadastroForm');
    if (!form) {
        console.error('Formulário de cadastro não encontrado');
        return;
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const botaoSubmit = form.querySelector('button[type="submit"]');
        const textoOriginal = botaoSubmit.textContent;

        try {
            botaoSubmit.disabled = true;
            botaoSubmit.textContent = 'Cadastrando...';

            const usuario = {
                nome: document.getElementById('nome').value.trim(),
                email: document.getElementById('email').value.trim().toLowerCase(),
                endereco: document.getElementById('endereco').value.trim(),
                telefone: document.getElementById('telefone').value.trim(),
                senha: document.getElementById('senha').value,
                confirmarSenha: document.getElementById('confirmar-senha').value
            };

            const erros = [];

            if (!usuario.nome) erros.push('Nome é obrigatório');
            if (!usuario.email) erros.push('E-mail é obrigatório');
            if (!usuario.senha) erros.push('Senha é obrigatória');

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (usuario.email && !emailRegex.test(usuario.email)) {
                erros.push('Por favor, insira um e-mail válido');
            }

            if (usuario.senha && usuario.senha.length < 6) {
                erros.push('A senha deve ter pelo menos 6 caracteres');
            }

            if (usuario.senha !== usuario.confirmarSenha) {
                erros.push('As senhas não coincidem');
            }

            if (erros.length > 0) {
                throw new Error(erros.join('\n'));
            }

            const response = await fetch('http://localhost:3300/api/auth/cadastro', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    nome: usuario.nome,
                    email: usuario.email,
                    endereco: usuario.endereco,
                    telefone: usuario.telefone,
                    senha: usuario.senha
                })
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(
                    errorData.erro ||
                    errorData.message ||
                    `Erro no servidor: ${response.status} ${response.statusText}`
                );
            }

            const data = await response.json();

            alert(data.mensagem || 'Cadastro realizado com sucesso!');

            setTimeout(() => {
                window.location.href = 'login.html';
            }, 1000);

        } catch (error) {
            console.error('Erro no cadastro:', error);
            const mensagemErro = error.message.includes('\n')
                ? `Por favor, corrija os seguintes erros:\n\n${error.message}`
                : error.message;
            alert(mensagemErro);

        } finally {
            botaoSubmit.disabled = false;
            botaoSubmit.textContent = textoOriginal;
        }
    });
});
