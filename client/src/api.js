export const API_URL = 'http://localhost:3000';

export async function apiFetch(path, options = {}) {
  const token = localStorage.getItem('token');
  const headers = options.headers ? { ...options.headers } : {};
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return fetch(`${API_URL}${path}`, { ...options, headers });
}
