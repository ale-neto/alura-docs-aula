import criarHashESal from "../../utils/password.js";
import { usuariosColecao } from "./dbConnect.js";

function adicionarUsuario({ nome, senha }) {
  const { hashSenha, salSenha } = criarHashESal(senha);
  return usuariosColecao.insertOne({ nome, hashSenha, salSenha });
}

function encontrarUsuario(nome) {
  return usuariosColecao.findOne({ nome });
}

export { adicionarUsuario, encontrarUsuario };
