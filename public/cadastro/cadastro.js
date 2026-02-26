import { emitirCadastro } from "./socket-front-cadastro.js";

const form = document.getElementById("form-cadastro");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const nome = form["input-usuario"].value;
  const senha = form["input-senha"].value;

  emitirCadastro({ nome, senha });
});
