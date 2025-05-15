document.getElementById('cadastroform').addEventListener('submit', function(e) {
  e.preventDefault();

  const nome = document.getElementById('nome').value;
  const email = document.getElementById('email').value;
  const endereco = document.getElementById('endereco').value;
  const senha = document.getElementById('senha').value;


  const usuario = {nome, email, endereco, senha};
  let usuario = JSON.parse()
  
 

});