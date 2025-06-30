import { Link } from 'react-router-dom';

export default function Instructions() {
  return (
    <section style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '2.5rem', color: '#333', marginBottom: '1rem' }}>
          📋 Cómo Jugar Escaleras y Serpientes
        </h2>
        <p style={{ fontSize: '1.1rem', color: '#666' }}>
          Aprende las reglas básicas y conviértete en un maestro del juego
        </p>
      </div>

      <div style={{
        background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        color: 'white',
        padding: '2rem',
        borderRadius: '15px',
        marginBottom: '2rem',
        textAlign: 'center'
      }}>
        <h3 style={{ marginBottom: '1rem' }}>🎯 Objetivo del Juego</h3>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
          Sé el primero en llegar exactamente a la casilla <strong>100</strong> lanzando un dado y moviéndote por el tablero.
          ¡Las escaleras te ayudan a subir más rápido, pero cuidado con las serpientes!
        </p>
      </div>

      <div style={{
        background: '#f8f9fa',
        padding: '2rem',
        borderRadius: '10px',
        marginBottom: '2rem'
      }}>
        <h3 style={{ color: '#333', marginBottom: '1.5rem', fontSize: '1.5rem' }}>
          📜 Reglas del Juego
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          <div>
            <ol style={{ lineHeight: '1.8', color: '#555' }}>
              <li><strong>Tablero:</strong> 100 casillas numeradas del 1 al 100</li>
              <li><strong>Inicio:</strong> Todos los jugadores comienzan en la posición 0</li>
              <li><strong>Turno:</strong> Lanza el dado (1-6) y avanza esa cantidad</li>
              <li><strong>Escaleras:</strong> Si caes al pie de una escalera, subes automáticamente</li>
            </ol>
          </div>
          <div>
            <ol start="5" style={{ lineHeight: '1.8', color: '#555' }}>
              <li><strong>Serpientes:</strong> Si caes en la cabeza de una serpiente, bajas</li>
              <li><strong>Victoria:</strong> Llega exactamente a la casilla 100</li>
              <li><strong>Límite:</strong> Si el dado te hace pasar del 100, no te mueves</li>
              <li><strong>Visual:</strong> El tablero se muestra como una cuadrícula 10x10</li>
            </ol>
          </div>
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '2rem',
        marginBottom: '2rem'
      }}>
        <div style={{
          background: 'linear-gradient(135deg, #d0ffd0, #a8f0a8)',
          padding: '1.5rem',
          borderRadius: '10px',
          border: '2px solid #4CAF50'
        }}>
          <h3 style={{ color: '#2e7d32', marginBottom: '1rem' }}>🪜 Escaleras (Te suben)</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', fontSize: '0.9rem' }}>
            <div><strong>4 → 14</strong></div>
            <div><strong>9 → 31</strong></div>
            <div><strong>20 → 38</strong></div>
            <div><strong>28 → 84</strong></div>
            <div><strong>40 → 59</strong></div>
            <div><strong>63 → 81</strong></div>
            <div><strong>71 → 91</strong></div>
          </div>
        </div>

        <div style={{
          background: 'linear-gradient(135deg, #ffd0d0, #f0a8a8)',
          padding: '1.5rem',
          borderRadius: '10px',
          border: '2px solid #f44336'
        }}>
          <h3 style={{ color: '#c62828', marginBottom: '1rem' }}>🐍 Serpientes (Te bajan)</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', fontSize: '0.9rem' }}>
            <div><strong>16 → 6</strong></div>
            <div><strong>47 → 26</strong></div>
            <div><strong>49 → 11</strong></div>
            <div><strong>56 → 53</strong></div>
            <div><strong>62 → 19</strong></div>
            <div><strong>64 → 60</strong></div>
            <div><strong>87 → 24</strong></div>
            <div><strong>93 → 73</strong></div>
            <div><strong>95 → 75</strong></div>
            <div><strong>98 → 78</strong></div>
          </div>
        </div>
      </div>

      <div style={{
        background: '#e3f2fd',
        padding: '2rem',
        borderRadius: '10px',
        textAlign: 'center',
        border: '2px solid #2196F3'
      }}>
        <h3 style={{ color: '#1976d2', marginBottom: '1rem' }}>💡 Consejos Pro</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', textAlign: 'left' }}>
          <div>
            <strong style={{ color: '#1976d2' }}>🎯 Estrategia:</strong>
            <p style={{ margin: '0.5rem 0', color: '#555' }}>Memoriza las posiciones de escaleras y serpientes para planificar tus movimientos</p>
          </div>
          <div>
            <strong style={{ color: '#1976d2' }}>🍀 Suerte:</strong>
            <p style={{ margin: '0.5rem 0', color: '#555' }}>Aunque hay estrategia, el dado decide mucho del juego</p>
          </div>
          <div>
            <strong style={{ color: '#1976d2' }}>⚡ Rapidez:</strong>
            <p style={{ margin: '0.5rem 0', color: '#555' }}>Las escaleras largas como 28→84 pueden cambiar el juego</p>
          </div>
          <div>
            <strong style={{ color: '#1976d2' }}>⚠️ Cuidado:</strong>
            <p style={{ margin: '0.5rem 0', color: '#555' }}>Las serpientes cerca del final (95, 98) son peligrosas</p>
          </div>
        </div>
      </div>

      <div style={{ textAlign: 'center', marginTop: '3rem' }}>
        <Link 
          to="/game" 
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            padding: '15px 30px',
            fontSize: '1.2rem',
            textDecoration: 'none',
            borderRadius: '25px',
            display: 'inline-block',
            marginRight: '1rem',
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
            transition: 'all 0.3s ease'
          }}
        >
          🚀 ¡Jugar Ahora!
        </Link>
        <Link 
          to="/" 
          style={{
            background: 'transparent',
            color: '#667eea',
            border: '2px solid #667eea',
            padding: '15px 30px',
            fontSize: '1.2rem',
            textDecoration: 'none',
            borderRadius: '25px',
            display: 'inline-block',
            transition: 'all 0.3s ease'
          }}
        >
          🏠 Volver al Inicio
        </Link>
      </div>
    </section>
  );
}
