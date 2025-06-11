import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiFetch } from '../api.js';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await apiFetch('/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      if (!res.ok) {
        alert('Credenciales incorrectas');
        return;
      }
      const data = await res.json();
      localStorage.setItem('token', data.token);
      navigate('/game');
    } catch (err) {
      console.error('Login error', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="email" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="password" />
      <button type="submit">Entrar</button>
    </form>
  );
}
