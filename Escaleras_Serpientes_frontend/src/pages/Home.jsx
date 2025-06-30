import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext.jsx';

export default function Home() {
  const { user } = useAuth();

  return (
    <section style={{ padding: '2rem', textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ marginBottom: '3rem' }}>
        <h1 style={{ 
          fontSize: '3rem', 
          color: '#333', 
          marginBottom: '1rem',
          textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
        }}>
          🐍🪜 Escaleras y Serpientes 🎮
        </h1>
        <p style={{ fontSize: '1.2rem', color: '#666', lineHeight: '1.6' }}>
          ¡El clásico juego de tablero ahora en línea! Sube por las escaleras, evita las serpientes 
          y sé el primero en llegar a la casilla 100.
        </p>
      </div>

      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '2rem',
        borderRadius: '15px',
        marginBottom: '2rem',
        boxShadow: '0 8px 16px rgba(0,0,0,0.2)'
      }}>
        {user ? (
          <div>
            <h2>¡Hola {user.email.split('@')[0]}! 👋</h2>
            <p style={{ marginBottom: '1.5rem' }}>¿Listo para una nueva partida?</p>
            <Link 
              to="/game" 
              style={{
                background: '#4CAF50',
                color: 'white',
                padding: '15px 30px',
                fontSize: '1.3rem',
                textDecoration: 'none',
                borderRadius: '25px',
                display: 'inline-block',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
              }}
            >
              🚀 ¡Jugar Ahora!
            </Link>
          </div>
        ) : (
          <div>
            <h2>¡Únete a la diversión! 🎯</h2>
            <p style={{ marginBottom: '1.5rem' }}>Crea una cuenta gratuita para empezar a jugar</p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link 
                to="/signup" 
                style={{
                  background: '#4CAF50',
                  color: 'white',
                  padding: '12px 24px',
                  textDecoration: 'none',
                  borderRadius: '25px',
                  fontSize: '1.1rem',
                  transition: 'all 0.3s ease'
                }}
              >
                📝 Registrarse
              </Link>
              <Link 
                to="/login" 
                style={{
                  background: 'transparent',
                  color: 'white',
                  border: '2px solid white',
                  padding: '12px 24px',
                  textDecoration: 'none',
                  borderRadius: '25px',
                  fontSize: '1.1rem',
                  transition: 'all 0.3s ease'
                }}
              >
                🔑 Iniciar Sesión
              </Link>
            </div>
          </div>
        )}
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '2rem',
        marginTop: '3rem'
      }}>
        <div style={{
          background: '#f8f9fa',
          padding: '1.5rem',
          borderRadius: '10px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ color: '#333', marginBottom: '1rem' }}>🎯 Cómo Jugar</h3>
          <p style={{ color: '#666', lineHeight: '1.5' }}>
            Lanza el dado y mueve tu ficha. Las escaleras te suben, 
            las serpientes te bajan. ¡Llega primero al 100!
          </p>
          <Link to="/instructions" style={{ color: '#4CAF50', textDecoration: 'none' }}>
            Ver instrucciones completas →
          </Link>
        </div>

        <div style={{
          background: '#f8f9fa',
          padding: '1.5rem',
          borderRadius: '10px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ color: '#333', marginBottom: '1rem' }}>❓ Preguntas</h3>
          <p style={{ color: '#666', lineHeight: '1.5' }}>
            ¿Tienes dudas sobre el juego? Consulta nuestras 
            preguntas frecuentes para resolver cualquier consulta.
          </p>
          <Link to="/faq" style={{ color: '#4CAF50', textDecoration: 'none' }}>
            Ver FAQ →
          </Link>
        </div>

        <div style={{
          background: '#f8f9fa',
          padding: '1.5rem',
          borderRadius: '10px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ color: '#333', marginBottom: '1rem' }}>👥 Sobre Nosotros</h3>
          <p style={{ color: '#666', lineHeight: '1.5' }}>
            Conoce más sobre el equipo detrás de este 
            divertido juego de escaleras y serpientes.
          </p>
          <Link to="/about" style={{ color: '#4CAF50', textDecoration: 'none' }}>
            Conocer más →
          </Link>
        </div>
      </div>
    </section>
  );
}
