import jwt from "jsonwebtoken";

function autorizarConexao(socket, next) {
  const tokenJwt = socket.handshake.auth.token;

  try {
    const payloadToken = jwt.verify(tokenJwt, "segredoSuperSecreto");

    if (!tokenJwt) {
      return next(new Error("Token JWT ausente"));
    }

    socket.emit("usuario_autenticado", payloadToken);

    next();
  } catch (error) {
    return next(new Error("Token JWT inválido"));
  }
}

export default autorizarConexao;
