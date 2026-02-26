import jwt from "jsonwebtoken";

function gerarJwt(usuario) {
  const payload = {
    usuario,
    exp: Math.floor(Date.now() / 1000) + 60 * 60, // Expira em 1 hora
  };

  return jwt.sign(payload, "segredoSuperSecreto");
}

export default gerarJwt;
