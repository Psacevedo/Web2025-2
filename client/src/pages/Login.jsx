import { useState } from 'react';
import { saveToken } from '../utils/storage.js';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || 'Error de autenticación');
        return;
      }
      const data = await res.json();
      saveToken(data.token);
      alert('Sesión iniciada');
    } catch (err) {
      setError('No se pudo conectar');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="email" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="password" />
      <button type="submit">Entrar</button>
      {error && <p className="error">{error}</p>}
    </form>
  );
}
