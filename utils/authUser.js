import { scryptSync, timingSafeEqual } from "crypto";

function authenticarUsuario(user, senha) {
  const hashTemporario = scryptSync(senha, user.salSenha, 64);
  const hash = Buffer.from(user.hashSenha, "hex");

  const authentication = timingSafeEqual(hashTemporario, hash);

  return authentication;
}

export default authenticarUsuario;
