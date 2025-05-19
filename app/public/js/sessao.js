const SESSAO_EXPIRACAO = 30 * 60 * 1000; // 30 minutos em ms

function salvarSessao(usuario) {
    localStorage.setItem('sessaoUsuario', JSON.stringify({
        usuario,
        timestamp: Date.now()
    }));
}

function verificarAutenticacao() {
    let sessao;
    try {
        sessao = JSON.parse(localStorage.getItem('sessaoUsuario'));
        console.log('Sessão atual no verificarAutenticacao:', sessao);
    } catch {
        return false;
    }

    if (!sessao || !sessao.usuario) {
        console.log('Sessão inválida: usuário não encontrado');
        return false;
    }

    const agora = Date.now();

    if (agora - sessao.timestamp > SESSAO_EXPIRACAO) {
        console.log('Sessão expirada');
        encerrarSessao();
        return false;
    }

    sessao.timestamp = agora;
    localStorage.setItem('sessaoUsuario', JSON.stringify(sessao));

    return true;
}

function obterUsuario() {
    try {
        const sessao = JSON.parse(localStorage.getItem('sessaoUsuario'));
        if (!sessao || !sessao.usuario) {
            return null;
        }
        // Garantir que usuario.id exista (corrigir se necessário)
        if (!sessao.usuario.id && sessao.usuario._id) {
            sessao.usuario.id = sessao.usuario._id;
        }
        return sessao.usuario;
    } catch {
        return null;
    }
}

function encerrarSessao() {
    localStorage.removeItem('sessaoUsuario');
}

function renovarSessao() {
    const sessao = JSON.parse(localStorage.getItem('sessaoUsuario'));
    if (sessao) {
        sessao.timestamp = Date.now();
        localStorage.setItem('sessaoUsuario', JSON.stringify(sessao));
    }
}

function iniciarControleSessao() {
    if (!verificarAutenticacao()) {
        alert('Sessão inválida ou expirada. Faça login novamente.');
        encerrarSessao();
        window.location.href = 'login.html';
        return;
    }

    ['click', 'keydown', 'mousemove', 'scroll'].forEach(evento => {
        window.addEventListener(evento, renovarSessao);
    });
}

window.salvarSessao = salvarSessao;
window.verificarAutenticacao = verificarAutenticacao;
window.obterUsuario = obterUsuario;
window.encerrarSessao = encerrarSessao;
window.renovarSessao = renovarSessao;
window.iniciarControleSessao = iniciarControleSessao;
