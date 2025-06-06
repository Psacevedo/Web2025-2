import { Link } from 'react-router-dom';
import './NavBar.css';

export default function NavBar() {
  return (
    <nav className="nav">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/instructions">Instrucciones</Link></li>
        <li><Link to="/about">Nosotros</Link></li>
        <li><Link to="/game">Ir a partida</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/signup">Registro</Link></li>
      </ul>
    </nav>
  );
}
