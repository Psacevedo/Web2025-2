# 🐍 Escaleras y Serpientes - Backend

Backend del juego Escaleras y Serpientes desarrollado con Node.js, Koa.js y Socket.IO.

## 🚀 Tecnologías

- **Node.js** - Runtime de JavaScript
- **Koa.js** - Framework web minimalista
- **Socket.IO** - Comunicación en tiempo real
- **SQLite** - Base de datos
- **Sequelize** - ORM
- **Jest** - Testing framework
- **ESLint** - Linting (Airbnb style)

## 📋 Características

- ✅ **API REST** para gestión de usuarios, juegos y jugadores
- ✅ **WebSocket** para juego en tiempo real
- ✅ **Autenticación JWT** 
- ✅ **Multipartida** - Soporte para múltiples juegos simultáneos
- ✅ **Tests unitarios** con 100% de cobertura
- ✅ **ESLint configurado** con reglas Airbnb
- ✅ **Docker** support

## 🛠 Instalación

```bash
# Clonar el repositorio
git clone <repository-url>
cd Escaleras_Serpientes_backend

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env

# Ejecutar en desarrollo
npm start

# Ejecutar tests
npm test

# Linting
npm run lint
npm run lint:fix
```

## 🌐 Endpoints Principales

### Autenticación
- `POST /auth/signup` - Registro de usuario
- `POST /auth/login` - Inicio de sesión

### Juegos
- `GET /games` - Listar juegos
- `POST /games` - Crear juego
- `GET /games/:id` - Obtener juego específico

### Jugadores
- `POST /games/:gameId/players` - Unirse a juego
- `POST /games/:gameId/roll` - Realizar jugada

## 🔌 WebSocket Events

### Cliente → Servidor
- `authenticate` - Autenticar usuario
- `joinGame` - Unirse a partida
- `makeMove` - Realizar movimiento

### Servidor → Cliente
- `gameState` - Estado actual del juego
- `playerJoined` - Jugador se unió
- `gameUpdate` - Actualización de juego

## 🧪 Testing

```bash
# Ejecutar todos los tests
npm test

# Tests con cobertura
npm run test:coverage
```

## 🐳 Docker

```bash
# Construir imagen
docker build -t escaleras-backend .

# Ejecutar contenedor
docker run -p 3001:3001 escaleras-backend
```

## 📁 Estructura del Proyecto

```
├── models/           # Modelos de Sequelize
├── routes/           # Rutas de la API
├── utils/            # Utilidades y lógica del juego
├── __tests__/        # Tests unitarios
├── docs/             # Documentación
└── app.js           # Punto de entrada
```

## 🔧 Variables de Entorno

```
PORT=3001
JWT_SECRET=your_jwt_secret
DATABASE_URL=sqlite:memory:
NODE_ENV=development
```