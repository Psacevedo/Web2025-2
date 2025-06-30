import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext.jsx';
import './NavBar.css';

export default function NavBar() {
  const { user, logout } = useAuth();
  return (    <nav className="nav">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/instructions">Instrucciones</Link></li>
        <li><Link to="/about">Nosotros</Link></li>
        <li><Link to="/faq">FAQ</Link></li>
        <li><Link to="/game" className="game-link">🎮 Jugar</Link></li>
        {user ? (
          <>
            <li className="user">{user.email}</li>
            <li><button onClick={logout}>Salir</button></li>
          </>
        ) : (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Registro</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
}
