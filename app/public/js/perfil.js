import { iniciarControleSessao, obterUsuario } from './sessao.js';

iniciarControleSessao();

const usuario = obterUsuario();


const TEMPO_SESSAO_MS = 30 * 60 * 1000; // 30 minutos

function obterSessao() {
    const sessaoJSON = localStorage.getItem('sessao');
    if (!sessaoJSON) return null;

    const sessao = JSON.parse(sessaoJSON);
    const expirou = (Date.now() - sessao.inicio) > TEMPO_SESSAO_MS;

    if (expirou) {
        localStorage.removeItem('sessao');
        return null;
    }
    return sessao.usuario;
}

function verificarAutenticacao() {
    const usuario = obterSessao();
    if (!usuario) {
        alert('Sessão expirada ou não autenticado.');
        window.location.href = 'login.html';
    }
    return usuario;
}

function encerrarSessao() {
    localStorage.removeItem('sessao');
    window.location.href = 'login.html';
}

function carregarDadosPerfil() {
    const usuario = verificarAutenticacao();
    if (!usuario) return;

    document.querySelector('.info-perfil h2').textContent = usuario.nome || 'Usuário';
    document.querySelector('.info-perfil p:nth-child(2)').textContent = usuario.email || '';
    document.querySelector('.info-perfil p:nth-child(3)').textContent = 'Membro desde: ' + (usuario.dataCadastro || '');

    // Atualiza campos do formulário
    document.getElementById('nome-completo').value = usuario.nome || '';
    document.getElementById('telefone').value = usuario.telefone || '';
    document.getElementById('endereco').value = usuario.endereco || '';


    if (usuario.fotoUrl) {
        document.querySelector('.foto-perfil').src = usuario.fotoUrl;
    }
}

async function salvarAlteracoes() {
    const usuario = verificarAutenticacao();
    if (!usuario) return;

    // Pega valores atualizados do formulário
    const nome = document.getElementById('nome-completo').value.trim();
    const telefone = document.getElementById('telefone').value.trim();
    const endereco = document.getElementById('endereco').value.trim();

    const senhaAtual = document.getElementById('senha-atual').value;
    const novaSenha = document.getElementById('nova-senha').value;
    const confirmarSenha = document.getElementById('confirmar-senha').value;

    // Validação simples para troca de senha
    if (novaSenha || confirmarSenha) {
        if (novaSenha !== confirmarSenha) {
            alert('As novas senhas não conferem.');
            return;
        }
        if (!senhaAtual) {
            alert('Informe a senha atual para alterar a senha.');
            return;
        }
    }

    const payload = {
        nome,
        telefone,
        endereco,
    };

    if (senhaAtual && novaSenha) {
        payload.senhaAtual = senhaAtual;
        payload.novaSenha = novaSenha;
    }

    try {
        const response = await fetch(`http://localhost:3300/api/usuarios/${usuario.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                // Adicione token ou autenticação se usar
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (response.ok) {
            alert('Perfil atualizado com sucesso!');
            // Atualiza usuário no localStorage para refletir alterações
            const sessao = JSON.parse(localStorage.getItem('sessao'));
            sessao.usuario = { ...sessao.usuario, ...payload };
            localStorage.setItem('sessao', JSON.stringify(sessao));
            carregarDadosPerfil();
            // Limpa campos de senha
            document.getElementById('senha-atual').value = '';
            document.getElementById('nova-senha').value = '';
            document.getElementById('confirmar-senha').value = '';
        } else {
            alert(data.erro || 'Erro ao atualizar perfil.');
        }
    } catch (error) {
        alert('Erro ao conectar com o servidor.');
    }
}

function cancelarAlteracoes() {
    carregarDadosPerfil();
    // Limpa campos de senha
    document.getElementById('senha-atual').value = '';
    document.getElementById('nova-senha').value = '';
    document.getElementById('confirmar-senha').value = '';
}

// Evento para botões
document.addEventListener('DOMContentLoaded', () => {
    carregarDadosPerfil();

    document.querySelector('.acoes-perfil .botao').addEventListener('click', (e) => {
        e.preventDefault();
        salvarAlteracoes();
    });

    document.querySelector('.acoes-perfil .botao-acao').addEventListener('click', (e) => {
        e.preventDefault();
        cancelarAlteracoes();
    });
});
