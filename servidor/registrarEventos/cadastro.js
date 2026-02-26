import { adicionarUsuario, encontrarUsuario } from "../db/usuariosDb.js";

function registrarEventosCadastro(socket, io) {
  socket.on("cadastro", async (dados) => {
    const usuarioExiste = (await encontrarUsuario(dados.nome)) !== null;
    if (usuarioExiste) {
      socket.emit("cadastro_falha_usuario_existente");
      return;
    }

    const resultado = await adicionarUsuario(dados);

    if (resultado.insertedId) {
      io.emit("cadastro_sucesso");
    } else {
      socket.emit("cadastro_falha");
    }
  });
}

export default registrarEventosCadastro;
