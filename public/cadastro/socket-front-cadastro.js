const socket = io();

function emitirCadastro(dados) {
  socket.emit("cadastro", dados);
}

socket.on("cadastro_sucesso", () => {
  alert("Cadastro realizado com sucesso!");
});

socket.on("cadastro_falha", () => {
  alert("Falha ao realizar o cadastro!");
});

socket.on("cadastro_falha_usuario_existente", () => {
  alert("Falha ao realizar o cadastro: usuário já existe!");
});

export { emitirCadastro };
