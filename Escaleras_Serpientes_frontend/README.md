# 🎮 Escaleras y Serpientes - Frontend

Frontend del juego Escaleras y Serpientes desarrollado con React, Vite y Socket.IO.

## 🚀 Tecnologías

- **React 18** - Biblioteca de UI
- **Vite** - Build tool y dev server
- **React Router** - Navegación SPA
- **Socket.IO Client** - WebSockets
- **Context API** - Gestión de estado
- **CSS3** - Estilos y animaciones
- **ESLint** - Linting (Airbnb style)

## 📋 Características

- ✅ **Interfaz moderna** y responsiva
- ✅ **Autenticación** con JWT
- ✅ **Tiempo real** via WebSockets
- ✅ **Multipartida** - Múltiples juegos simultáneos
- ✅ **Lobby de juegos** para crear/unirse a partidas
- ✅ **Animaciones** y efectos visuales
- ✅ **PWA Ready** - Progressive Web App

## 🛠 Instalación

```bash
# Clonar el repositorio
git clone <repository-url>
cd Escaleras_Serpientes_frontend

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env

# Ejecutar en desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview

# Linting
npm run lint
npm run lint:fix
```

## 🌐 Páginas Principales

### Públicas
- `/` - Página de inicio
- `/login` - Inicio de sesión
- `/signup` - Registro de usuario
- `/instructions` - Instrucciones del juego
- `/about` - Acerca del juego

### Protegidas (Requieren autenticación)
- `/lobby` - Lobby de juegos
- `/game` - Juego individual
- `/game/:gameId` - Juego multijugador

## 🎯 Componentes Principales

### Contextos
- **AuthContext** - Gestión de autenticación
- **SocketContext** - Manejo de WebSockets

### Componentes
- **NavBar** - Barra de navegación
- **Board** - Tablero del juego
- **ProtectedRoute** - Rutas protegidas

### Páginas
- **Home** - Página principal
- **GameLobby** - Lista de juegos disponibles
- **MultiplayerGame** - Juego en tiempo real
- **Game** - Juego individual

## 🔌 WebSocket Integration

### Eventos Enviados
```javascript
// Autenticación
socket.emit('authenticate', { userId, token });

// Unirse a juego
socket.emit('joinGame', { gameId, userId });

// Realizar jugada
socket.emit('makeMove', { gameId, playerId, roll });
```

### Eventos Recibidos
```javascript
// Estado del juego
socket.on('gameState', (state) => { ... });

// Jugador se unió
socket.on('playerJoined', (data) => { ... });

// Actualización de juego
socket.on('gameUpdate', (update) => { ... });
```

## 🎨 Estilos y UI

### Características de Diseño
- **Responsive** - Adaptable a móviles y desktop
- **Dark/Light mode** - Tema adaptable
- **Animaciones CSS** - Transiciones suaves
- **Grid layout** - Tablero responsive
- **Modern UI** - Interfaz limpia y moderna

### Estructura CSS
```
src/
├── assets/styles/
│   └── main.css         # Estilos globales
├── components/
│   ├── Board.css        # Estilos del tablero
│   └── NavBar.css       # Estilos de navegación
```

## 🧪 Testing

```bash
# Ejecutar tests
npm test

# Tests en modo watch
npm run test:watch

# Coverage report
npm run test:coverage
```

## 🚀 Despliegue

### Build de Producción
```bash
npm run build
```

### Deploy en Netlify
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod --dir=dist
```

### Deploy en Vercel
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── Board.jsx       # Tablero del juego
│   ├── NavBar.jsx      # Barra de navegación
│   └── ProtectedRoute.jsx
├── pages/              # Páginas de la aplicación
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── GameLobby.jsx
│   └── MultiplayerGame.jsx
├── assets/             # Recursos estáticos
│   ├── sprites/        # SVGs del juego
│   └── styles/         # Estilos CSS
├── AuthContext.jsx     # Context de autenticación
├── SocketContext.jsx   # Context de WebSockets
├── config.js          # Configuración
└── main.jsx           # Punto de entrada
```

## 🔧 Variables de Entorno

```bash
# .env
VITE_API_URL=http://localhost:3001
VITE_WS_URL=ws://localhost:3001
```

## 📱 PWA Features

- **Service Worker** - Cache de recursos
- **Manifest** - Instalable como app
- **Offline support** - Funcionalidad básica offline
- **Push notifications** - Notificaciones de juego

## 🎮 Flujo de Usuario

1. **Landing** → Página principal con información
2. **Registro/Login** → Autenticación de usuario  
3. **Lobby** → Lista de juegos disponibles
4. **Crear/Unirse** → Crear nueva partida o unirse
5. **Jugar** → Tablero interactivo en tiempo real
6. **Resultados** → Pantalla de victoria/derrota

## 🔄 Estado de la Aplicación

### AuthContext
```javascript
{
  user: { token, email, role, userId },
  login: (email, password) => {},
  signup: (email, password) => {},
  logout: () => {}
}
```

### SocketContext
```javascript
{
  socket: SocketIO,
  connected: boolean,
  joinGame: (gameId) => {},
  leaveGame: (gameId) => {}
}
```

## 🛡 Seguridad

- **JWT Tokens** - Autenticación segura
- **Protected Routes** - Rutas autenticadas
- **Input Validation** - Validación client-side
- **HTTPS Ready** - Preparado para SSL
- **CORS Configured** - Configuración de CORS

## 📊 Performance

- **Code Splitting** - Carga por rutas
- **Lazy Loading** - Componentes bajo demanda
- **Bundle Analysis** - Optimización de bundles
- **Tree Shaking** - Eliminación de código no usado