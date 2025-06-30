import { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { API_URL } from './config.js';
import { useAuth } from './AuthContext.jsx';

const SocketContext = createContext(null);

export function useSocket() {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket debe usarse dentro de SocketProvider');
  }
  return context;
}

export function SocketProvider({ children }) {
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);
  const [userGames, setUserGames] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const newSocket = io(API_URL.replace('http', 'ws'));
    
    newSocket.on('connect', () => {
      console.log('Conectado al servidor WebSocket');
      setConnected(true);
      
      newSocket.emit('authenticate', {
        userId: user.email,
        token: user.token,
      });
    });

    newSocket.on('authenticated', (data) => {
      console.log('Usuario autenticado en WebSocket:', data);
      
      newSocket.emit('getUserGames', { userId: user.email });
    });

    newSocket.on('userGames', (games) => {
      setUserGames(games);
    });

    newSocket.on('disconnect', () => {
      console.log('Desconectado del servidor WebSocket');
      setConnected(false);
    });

    newSocket.on('error', (error) => {
      console.error('Error de WebSocket:', error);
    });

    setSocket(newSocket);

    return () => {
      if (newSocket) {
        newSocket.disconnect();
      }
    };
  }, [user]);

  const joinGame = (gameId) => {
    if (socket && user) {
      socket.emit('joinGame', {
        gameId,
        userId: user.email,
      });
    }
  };

  const leaveGame = (gameId) => {
    if (socket) {
      socket.emit('leaveGame', { gameId });
    }
  };

  const makeMove = (gameId, playerId, roll) => {
    if (socket) {
      socket.emit('makeMove', {
        gameId,
        playerId,
        roll,
      });
    }
  };

  const refreshUserGames = () => {
    if (socket && user) {
      socket.emit('getUserGames', { userId: user.email });
    }
  };

  const value = {
    socket,
    connected,
    userGames,
    joinGame,
    leaveGame,
    makeMove,
    refreshUserGames,
  };

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );
}
