import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiFetch } from '../api.js';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await apiFetch('/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      if (!res.ok) {
        alert('No se pudo registrar');
        return;
      }
      const loginRes = await apiFetch('/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      if (loginRes.ok) {
        const data = await loginRes.json();
        localStorage.setItem('token', data.token);
        navigate('/game');
      }
    } catch (err) {
      console.error('Signup error', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Registro</h2>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="email" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="password" />
      <button type="submit">Registrar</button>
    </form>
  );
}
