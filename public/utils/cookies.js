function definirCookie(key, tokenJwt) {
  document.cookie = `${key}=${tokenJwt}; path=/; SameSite=Lax`;
}

function obterCookie(key) {
  const cookies = document.cookie.split(";");

  for (const cookie of cookies) {
    const trimmed = cookie.trim();

    if (trimmed.startsWith(key + "=")) {
      return trimmed.substring(key.length + 1);
    }
  }

  return null;
}

function removerCookie(key) {
  document.cookie = `${key}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
}

export { definirCookie, obterCookie, removerCookie };
