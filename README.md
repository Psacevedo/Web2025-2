# 🐍 Escaleras y Serpientes - Proyecto Completo

Implementación completa del juego Escaleras y Serpientes con backend API y frontend React, soporte multijugador en tiempo real y arquitectura moderna.

## 📁 Estructura del Proyecto

```
web2025-2/
├── 📁 Escaleras_Serpientes_backend/     # Backend API (Node.js + Koa.js)
└── 📁 Escaleras_Serpientes_frontend/    # Frontend React (React + Vite)
```

## 🚀 Inicio Rápido

### Prerrequisitos
- **Node.js** (v18 o superior)
- **npm** (incluido con Node.js)
- **Git** (para clonar el repositorio)

### 1. Clonar el Repositorio
```bash
git clone <repository-url>
cd web2025-2
```

### 2. Configurar y Ejecutar Backend
```bash
# Navegar al directorio backend
cd Escaleras_Serpientes_backend

# Instalar dependencias
npm install

# Configurar variables de entorno (opcional)
cp .env.example .env

# Ejecutar servidor
npm start
```
**Backend disponible en:** http://localhost:3001

### 3. Configurar y Ejecutar Frontend
```bash
# En una nueva terminal, navegar al directorio frontend
cd Escaleras_Serpientes_frontend

# Instalar dependencias
npm install

# Configurar variables de entorno (opcional)
cp .env.example .env

# Ejecutar aplicación
npm run dev
```
**Frontend disponible en:** http://localhost:5173

## 🎮 Cómo Jugar

1. **Registro/Login**: Crea una cuenta o inicia sesión
2. **Lobby**: Ve la lista de juegos disponibles
3. **Crear Juego**: Inicia una nueva partida
4. **Unirse**: Únete a un juego existente
5. **Jugar**: ¡Lanza el dado y mueve tu ficha!

## 🏗 Arquitectura

### Backend (`Escaleras_Serpientes_backend/`)
- **Framework**: Koa.js con ES Modules
- **Base de Datos**: SQLite (desarrollo) / PostgreSQL (producción)
- **Autenticación**: JWT
- **WebSockets**: Socket.IO para tiempo real
- **Testing**: Jest con 100% cobertura
- **Linting**: ESLint (Airbnb)

### Frontend (`Escaleras_Serpientes_frontend/`)
- **Framework**: React 18 con Hooks
- **Build Tool**: Vite
- **Routing**: React Router DOM
- **State Management**: Context API
- **WebSockets**: Socket.IO Client
- **Styling**: CSS3 con variables
- **Linting**: ESLint (Airbnb React)

## 🌐 Endpoints API

### Autenticación
- `POST /auth/signup` - Registro de usuario
- `POST /auth/login` - Inicio de sesión

### Juegos
- `GET /games` - Listar juegos activos
- `POST /games` - Crear nuevo juego
- `GET /games/:id` - Obtener juego específico

### Jugadores
- `POST /games/:gameId/players` - Unirse a juego
- `POST /games/:gameId/roll` - Realizar jugada

## 🔌 WebSocket Events

### Cliente → Servidor
```javascript
socket.emit('authenticate', { userId, token })
socket.emit('joinGame', { gameId, userId })
socket.emit('makeMove', { gameId, playerId, roll })
```

### Servidor → Cliente
```javascript
socket.on('gameState', (state) => { /* Estado del juego */ })
socket.on('playerJoined', (data) => { /* Jugador se unió */ })
socket.on('gameUpdate', (update) => { /* Actualización */ })
```

## 🧪 Testing y Calidad

### Backend
```bash
cd Escaleras_Serpientes_backend

# Ejecutar tests
npm test

# Cobertura de tests
npm run test:coverage

# Linting
npm run lint
npm run lint:fix
```

### Frontend
```bash
cd Escaleras_Serpientes_frontend

# Ejecutar tests
npm test

# Linting
npm run lint
npm run lint:fix

# Build de producción
npm run build
```

## 🐳 Docker (Opcional)

### Backend con Docker
```bash
cd Escaleras_Serpientes_backend

# Construir imagen
docker build -t escaleras-backend .

# Ejecutar contenedor
docker run -p 3001:3001 escaleras-backend
```

### Docker Compose (Backend + PostgreSQL)
```bash
cd Escaleras_Serpientes_backend
docker-compose up --build
```

## 🔧 Variables de Entorno

### Backend (`.env`)
```env
PORT=3001
DATABASE_URL=sqlite::memory:
JWT_SECRET=tu_jwt_secret_muy_seguro
NODE_ENV=development
```

### Frontend (`.env`)
```env
VITE_API_URL=http://localhost:3001
VITE_WS_URL=ws://localhost:3001
```

## 🚀 Despliegue

### Backend
- **Render/Railway**: Subir carpeta `Escaleras_Serpientes_backend/`
- **Variables**: Configurar `DATABASE_URL`, `JWT_SECRET`
- **Comando**: `node app.js`

### Frontend
- **Netlify/Vercel**: Subir carpeta `Escaleras_Serpientes_frontend/`
- **Build**: `npm run build`
- **Directorio**: `dist/`

## 📋 Funcionalidades

### ✅ Implementadas
- [x] **Autenticación JWT** completa
- [x] **Multijugador en tiempo real** via WebSocket
- [x] **Múltiples juegos simultáneos**
- [x] **Lógica completa** del juego
- [x] **API REST** completa
- [x] **Interfaz responsive** moderna
- [x] **Tests unitarios** 100% cobertura
- [x] **Linting** y calidad de código
- [x] **Docker** support

### 🔄 Posibles Mejoras
- [ ] **Chat en tiempo real** entre jugadores
- [ ] **Sistema de estadísticas** y ranking
- [ ] **Diferentes tableros** y temas
- [ ] **Notificaciones push**
- [ ] **PWA** capabilities
- [ ] **Modo espectador**

## 🛠 Desarrollo

### Estructura de Commits
```bash
feat: nueva funcionalidad
fix: corrección de bug
docs: cambios en documentación
style: cambios de formato
refactor: refactorización
test: añadir/modificar tests
```

### Flujo de Desarrollo
1. Fork del repositorio
2. Crear rama: `git checkout -b feature/nueva-funcionalidad`
3. Hacer cambios y commits
4. Push: `git push origin feature/nueva-funcionalidad`
5. Crear Pull Request

## 📞 Soporte

### Archivos de Documentación
- **Backend**: `Escaleras_Serpientes_backend/README.md`
- **Frontend**: `Escaleras_Serpientes_frontend/README.md`
- **Contribución**: `*/CONTRIBUTING.md`
- **Changelog**: `*/CHANGELOG.md`

### Problemas Comunes

**Backend no inicia:**
```bash
# Verificar Node.js
node --version

# Reinstalar dependencias
rm -rf node_modules package-lock.json
npm install
```

**Frontend no carga:**
```bash
# Verificar puerto backend
curl http://localhost:3001/health

# Revisar variables de entorno
cat .env
```

**WebSocket no conecta:**
- Verificar que backend esté ejecutándose
- Revisar URL en `.env`: `VITE_WS_URL`
- Verificar CORS en backend

## 📊 Tecnologías

### Backend
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)
![Koa.js](https://img.shields.io/badge/Koa.js-33333D?style=flat&logo=koa&logoColor=white)
![Socket.IO](https://img.shields.io/badge/Socket.IO-010101?style=flat&logo=socket.io&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-003B57?style=flat&logo=sqlite&logoColor=white)
![Jest](https://img.shields.io/badge/Jest-C21325?style=flat&logo=jest&logoColor=white)

### Frontend
![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)

## 📝 Licencia

MIT License - ver `LICENSE` en cada subdirectorio.

## 👥 Contribuidores

- **Desarrollador Principal**: [Tu Nombre]
- **Contribuciones**: Ver `CONTRIBUTING.md` en cada proyecto

---

## 🎯 Comandos Rápidos

```bash
# Clonar e instalar todo
git clone <repo>
cd web2025-2

# Backend (Terminal 1)
cd Escaleras_Serpientes_backend && npm install && npm start

# Frontend (Terminal 2)  
cd Escaleras_Serpientes_frontend && npm install && npm run dev

# Abrir navegador
open http://localhost:5173
```

¡Listo para jugar! 🎲🐍🪜
