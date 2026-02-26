import { definirCookie } from "../utils/cookies.js";

const socket = io();

function emitirLogin(dados) {
  socket.emit("login", dados);
}

socket.on("loginSuccess", (tokenJwt) => {
  definirCookie("token", tokenJwt);
  alert("Login bem-sucedido!");
  window.location.href = "/";
});

socket.on("loginError", () => {
  alert("Usuário ou senha incorretos!");
});

socket.on("loginNotFound", () => {
  alert("Usuário não encontrado!");
});

export { emitirLogin };
