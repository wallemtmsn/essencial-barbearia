// Função para cadastrar um usuário
function cadastrarUsuario(event) {
  event.preventDefault(); // Impede o envio do formulário

  // Obtenha os valores dos campos do formulário
  const nome = document.getElementById('nome').value;
  const telefone = document.getElementById('telefone').value;
  const data = document.getElementById('data').value;
  const hora = document.getElementById('hora').value;

  // Verifique se todos os campos estão preenchidos
  if (nome && telefone && data && hora) {
    // Crie um objeto com os dados do usuário
    const usuario = {
      nome: nome,
      telefone: telefone,
      data: data,
      hora: hora,
    };

    // Verifique se já existem usuários cadastrados no armazenamento local
    let users = localStorage.getItem('users');
    if (users) {
      users = JSON.parse(users);
    } else {
      users = [];
    }

    // Adicione o novo usuário ao array de usuários
    users.push(usuario);

    // Ordena a lista de usuários em ordem alfabética pelo nome
    users.sort((a, b) => a.nome.localeCompare(b.nome));

    // Atualize os usuários no armazenamento local
    localStorage.setItem('users', JSON.stringify(users));

    // Limpe o formulário
    document.getElementById('cadastroForm').reset();

    // Atualize a lista de usuários exibida na página
    atualizarListaUsuarios(users);

    // Exiba uma mensagem de sucesso, se necessário
    alert('Agendamento realizado com sucesso!');
  } else {
    // Exiba uma mensagem de erro informando que todos os campos são obrigatórios
    alert('Todos os campos são obrigatórios. Preencha todos os campos antes de agendar.');
  }
}

// Função para atualizar a lista de usuários exibida na página
function atualizarListaUsuarios(users) {
  const userList = document.getElementById('userList');

  // Limpa a lista de usuários existente
  userList.innerHTML = '';

  // Cria um item de lista para cada usuário e adiciona à lista
  users.forEach((user) => {
    const listItem = document.createElement('li');
    listItem.textContent = `
    Cliente: ${user.nome}
    Data: ${user.data}
    Hora:${user.hora}`;
    userList.appendChild(listItem);
  });
}

// Verifique se há usuários cadastrados no armazenamento local ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
  let users = localStorage.getItem('users');
  if (users) {
    users = JSON.parse(users);
    atualizarListaUsuarios(users);
  }
});

// Adicione o evento de envio do formulário para a função de cadastro do usuário
document.getElementById('cadastroForm').addEventListener('submit', cadastrarUsuario);
