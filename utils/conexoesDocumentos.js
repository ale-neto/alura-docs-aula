const conexoesDocumentos = [];

function encontrarConexaoDocumento(nomeDocumento, nomeUsuario) {
  return conexoesDocumentos.find(
    (conexao) =>
      conexao.nomeDocumento === nomeDocumento &&
      conexao.nomeUsuario === nomeUsuario
  );
}

function adicionarConexaoDocumento(conexao) {
  conexoesDocumentos.push(conexao);
}

function obterUsuariosNoDocumento(nomeDocumento) {
  return conexoesDocumentos
    .filter((conexao) => conexao.nomeDocumento === nomeDocumento)
    .map((conexao) => conexao.nomeUsuario);
}

function removerConexaoDocumento({ nomeDocumento, nomeUsuario }) {
  conexoesDocumentos.splice(
    conexoesDocumentos.findIndex(
      (conexao) =>
        conexao.nomeDocumento === nomeDocumento &&
        conexao.nomeUsuario === nomeUsuario
    ),
    1
  );
}

export {
  adicionarConexaoDocumento,
  obterUsuariosNoDocumento,
  removerConexaoDocumento,
  encontrarConexaoDocumento,
};
