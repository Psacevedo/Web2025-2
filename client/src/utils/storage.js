export function saveToken(token) {
  try {
    localStorage.setItem('jwt', token);
  } catch {}
}

export function loadToken() {
  try {
    return localStorage.getItem('jwt');
  } catch {
    return null;
  }
}
