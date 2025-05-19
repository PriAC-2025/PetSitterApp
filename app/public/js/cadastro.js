document.getElementById('cadastroForm').addEventListener('submit', async (e) => {
import { iniciarControleSessao, obterUsuario } from './sessao.js';

iniciarControleSessao();

// Agora pode usar obterUsuario() para pegar dados do usuário logado
const usuario = obterUsuario();

    
    e.preventDefault();
    
    // Elementos do DOM
    const form = e.target;
    const botaoSubmit = form.querySelector('button[type="submit"]');
    const textoOriginal = botaoSubmit.textContent;
    
    try {
        // Feedback visual
        botaoSubmit.disabled = true;
        botaoSubmit.textContent = 'Cadastrando...';
        
        // Coleta de dados
        const usuario = {
            nome: document.getElementById('nome').value.trim(),
            email: document.getElementById('email').value.trim().toLowerCase(),
            endereco: document.getElementById('endereco').value.trim(),
            telefone: document.getElementById('telefone').value.trim(),
            senha: document.getElementById('senha').value,
            confirmarSenha: document.getElementById('confirmar-senha').value
        };

        // Validação no cliente
        const erros = [];
        
        if (!usuario.nome) erros.push('Nome é obrigatório');
        if (!usuario.email) erros.push('E-mail é obrigatório');
        if (!usuario.senha) erros.push('Senha é obrigatória');
        
        // Validação de e-mail
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (usuario.email && !emailRegex.test(usuario.email)) {
            erros.push('Por favor, insira um e-mail válido');
        }
        
        // Validação de senha
        if (usuario.senha && usuario.senha.length < 6) {
            erros.push('A senha deve ter pelo menos 6 caracteres');
        }
        
        if (usuario.senha !== usuario.confirmarSenha) {
            erros.push('As senhas não coincidem');
        }

        if (erros.length > 0) {
            throw new Error(erros.join('\n'));
        }

        // Requisição para o backend
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

        // Verificação da resposta
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(
                errorData.erro || 
                errorData.message || 
                `Erro no servidor: ${response.status} ${response.statusText}`
            );
        }

        // Processa resposta de sucesso
        const data = await response.json();
        
        // Feedback ao usuário
        alert(data.mensagem || 'Cadastro realizado com sucesso!');
        
        // Redireciona após 1 segundo para melhor UX
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 1000);

    } catch (error) {
        console.error('Erro no cadastro:', error);
        
        // Mensagem de erro mais amigável
        const mensagemErro = error.message.includes('\n') 
            ? `Por favor, corrija os seguintes erros:\n\n${error.message}`
            : error.message;
            
        alert(mensagemErro);
        
    } finally {
        // Restaura o botão
        botaoSubmit.disabled = false;
        botaoSubmit.textContent = textoOriginal;
    }
});