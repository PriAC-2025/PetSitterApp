document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const credenciais = {
        email: document.getElementById('email').value,
        senha: document.getElementById('senha').value
    };

    try {
        const response = await fetch('http://localhost:3300/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credenciais)
        });

        const data = await response.json();

            if (response.ok) {
                localStorage.setItem('usuario', JSON.stringify(data.user)); // Armazena dados do usuário
                window.location.href = 'home.html';
        } else {
            alert(data.erro || 'Credenciais inválidas');
        }
    } catch (error) {
        alert('Erro ao conectar com o servidor');
    }
});