import { MongoClient } from "mongodb";

const cliente = new MongoClient("mongodb://localhost:27017");
let documentosColecao;
let usuariosColecao;

try {
  await cliente.connect();
  const db = cliente.db("alura-docs");
  documentosColecao = db.collection("documentos");
  usuariosColecao = db.collection("usuarios");

  console.log("Conectado ao banco de dados!");
  console.log("Coleção de documentos pronta para uso.");
  console.log("Coleção de usuários pronta para uso.");
} catch (error) {
  console.error("Erro ao conectar ao banco de dados:", error);
}

export { documentosColecao, usuariosColecao };
