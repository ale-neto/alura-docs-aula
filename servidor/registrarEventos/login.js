import authenticarUsuario from "../../utils/authUser.js";
import gerarJwt from "../../utils/gerarJwt.js";
import { encontrarUsuario } from "../db/usuariosDb.js";

function registrarEventosLogin(socket, io) {
  socket.on("login", async ({ usuario, senha }) => {
    const user = await encontrarUsuario(usuario);

    if (user) {
      const auth = authenticarUsuario(user, senha);

      if (auth) {
        const tokenJwt = gerarJwt(usuario);
        socket.emit("loginSuccess", tokenJwt);
      } else {
        socket.emit("loginError");
      }
    } else {
      socket.emit("loginNotFound");
    }
  });
}

export default registrarEventosLogin;
