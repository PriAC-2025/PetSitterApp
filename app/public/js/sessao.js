const SESSAO_EXPIRACAO = 30 * 60 * 1000; // 30 minutos em ms

// Salvar sessão com timestamp
function salvarSessao(usuario) {
    const sessao = {
        usuario,
        timestamp: Date.now()
    };
    localStorage.setItem('sessaoUsuario', JSON.stringify(sessao));
}

// Verificar autenticação e validade da sessão
function verificarAutenticacao() {
    let sessao;
    try {
        sessao = JSON.parse(localStorage.getItem('sessaoUsuario'));
    } catch {
        return false; // Não redireciona aqui
    }

    if (!sessao || !sessao.usuario) {
        return false; // Também não redireciona aqui
    }

    const agora = Date.now();

    if (agora - sessao.timestamp > SESSAO_EXPIRACAO) {
        return false; // Sessão expirada
    }

    // Atualiza timestamp para renovar a sessão
    sessao.timestamp = agora;
    localStorage.setItem('sessaoUsuario', JSON.stringify(sessao));

    return true;
}

    const agora = Date.now();

    if (agora - sessao.timestamp > SESSAO_EXPIRACAO) {
        encerrarSessao();
        alert('Sessão expirada. Faça login novamente.');
        window.location.href = 'login.html';
        return false;
    }

    // Atualiza timestamp para renovar a sessão
    sessao.timestamp = agora;
    localStorage.setItem('sessaoUsuario', JSON.stringify(sessao));

    return true;


function obterUsuario() {
    try {
        const sessao = JSON.parse(localStorage.getItem('sessaoUsuario'));
        return sessao ? sessao.usuario : null;
    } catch {
        return null;
    }
}

function encerrarSessao() {
    localStorage.removeItem('sessaoUsuario');
}

// Renova timestamp da sessão ao detectar interação do usuário
function renovarSessao() {
    const sessao = JSON.parse(localStorage.getItem('sessaoUsuario'));
    if (sessao) {
        sessao.timestamp = Date.now();
        localStorage.setItem('sessaoUsuario', JSON.stringify(sessao));
    }
}

// Configura renovação automática da sessão via eventos de interação
function iniciarControleSessao() {
    if (!verificarAutenticacao()) {
        // Redireciona para login aqui, assim é mais controlado
        alert('Sessão inválida ou expirada. Faça login novamente.');
        encerrarSessao();
        window.location.href = 'login.html';
        return;
    }

    ['click', 'keydown', 'mousemove', 'scroll'].forEach(evento => {
        window.addEventListener(evento, renovarSessao);
    });
}

// Expor funções no escopo global para uso em outros scripts
window.salvarSessao = salvarSessao;
window.verificarAutenticacao = verificarAutenticacao;
window.obterUsuario = obterUsuario;
window.encerrarSessao = encerrarSessao;
window.iniciarControleSessao = iniciarControleSessao;
