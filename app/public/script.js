document.getElementById('cadastroform').addEventListener('submit', function(e) {
      e.preventDefault();

      const usuario = {
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        endereco: document.getElementById('endereco').value,
        senha: document.getElementById('senha').value
      };

      fetch('/cadastro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(usuario)
      })
      .then(res => res.json())
      .then(data => alert(data.mensagem))
      .catch(err => console.error('Erro ao cadastrar:', err));
    });