document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('loginForm');
  if (!form) {
    console.error('Formulário de login não encontrado!');
    return;
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const credenciais = {
      email: document.getElementById('email').value.trim(),
      senha: document.getElementById('senha').value.trim()
    };

    try {
      const response = await fetch('http://localhost:3300/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credenciais)
      });

      const data = await response.json();

      if (!data.usuario && !data.user && !data.usuarioId && !data.userId) {
        alert('Dados do usuário inválidos na resposta do servidor.');
        return;
      }

      // Ajuste para aceitar diferentes estruturas de resposta
      const usuario = data.user || data.usuario || { id: data.usuarioId || data.userId };
      if (!usuario.id) {
        alert('ID do usuário não encontrado na resposta.');
        return;
      }

      localStorage.setItem('sessaoUsuario', JSON.stringify({
        usuario,
        timestamp: Date.now()
      }));

      window.location.href = 'home.html';
    } catch (error) {
      alert('Erro ao conectar com o servidor');
      console.error(error);
    }
  });
});
