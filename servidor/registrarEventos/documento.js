import {
  adicionarConexaoDocumento,
  encontrarConexaoDocumento,
  obterUsuariosNoDocumento,
  removerConexaoDocumento,
} from "../../utils/conexoesDocumentos.js";
import {
  atualizaDocumento,
  encontrarDocumento,
  excluirDocumento,
} from "../db/documentosDb.js";

function registrarEventosDocumento(socket, io) {
  socket.on(
    "selecionar_documento",
    async ({ nomeDocumento, nomeUsuario }, devolverTexto) => {
      const documento = await encontrarDocumento(nomeDocumento);

      if (documento) {
        const conexaoExiste = encontrarConexaoDocumento(
          nomeDocumento,
          nomeUsuario
        );

        if (!conexaoExiste) {
          socket.join(nomeDocumento);

          adicionarConexaoDocumento({
            nomeDocumento,
            nomeUsuario,
          });

          socket.data = {
            usuarioEntrou: true,
          };

          const usuariosNoDocumento = obterUsuariosNoDocumento(nomeDocumento);

          io.to(nomeDocumento).emit(
            "usuarios_no_documento",
            usuariosNoDocumento
          );

          devolverTexto(documento.texto);
        } else {
          socket.emit("erro_conexao_documento");
        }
      }

      socket.on("texto_editor", async ({ texto, nomeDocumento }) => {
        const atualizacao = await atualizaDocumento(nomeDocumento, texto);

        if (atualizacao.modifiedCount) {
          socket.to(nomeDocumento).emit("texto_editor_clientes", texto);
        }
      });

      socket.on("excluir_documento", async (nome) => {
        const resultado = await excluirDocumento(nome);

        if (resultado.deletedCount) {
          io.emit("excluir_documento_sucesso", nome);
        }
      });

      socket.on("disconnect", () => {
        if (socket.data.usuarioEntrou) {
          removerConexaoDocumento({ nomeDocumento, nomeUsuario });

          const usuariosNoDocumento = obterUsuariosNoDocumento(nomeDocumento);

          io.to(nomeDocumento).emit(
            "usuarios_no_documento",
            usuariosNoDocumento
          );
        }
      });
    }
  );
}

export default registrarEventosDocumento;
