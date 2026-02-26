import { obterCookie } from "../utils/cookies.js";
import {
  alertarERedirecionar,
  atualizarInterfaceUsuariosNoDocumento,
  atualizaTextoEditor,
  tratarAutenticacaoSucesso,
} from "./documento.js";

const socket = io("/usuarios", {
  auth: {
    token: obterCookie("token"),
  },
});

socket.on("usuario_autenticado", tratarAutenticacaoSucesso);

socket.on("connect_error", (err) => {
  alert(
    "Erro de conexão com o servidor. Por favor, tente novamente mais tarde."
  );
  window.location.href = "/login/index.html";
});

function selecionarDocumento(dados) {
  socket.emit("selecionar_documento", dados, (texto) => {
    atualizaTextoEditor(texto);
  });
}

socket.on("erro_conexao_documento", () => {
  alert("Usuário conectado em outro dispositivo. Por favor, tente novamente.");
  window.location.href = "/";
});

socket.on("usuarios_no_documento", atualizarInterfaceUsuariosNoDocumento);

function emitirTextoEditor(dados) {
  socket.emit("texto_editor", dados);
}

socket.on("texto_editor_clientes", (texto) => {
  atualizaTextoEditor(texto);
});

function emitirExcluirDocumento(nome) {
  socket.emit("excluir_documento", nome);
}

socket.on("excluir_documento_sucesso", (nome) => {
  alertarERedirecionar(nome);
});

export { emitirTextoEditor, selecionarDocumento, emitirExcluirDocumento };
