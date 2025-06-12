# Snakes and Ladders API

This is a minimal API example built with Koa and Sequelize to demonstrate a simple Snakes and Ladders (Escaleras y Toboganes) game.

## Setup

Install dependencies:

```
npm install
```

Create a `.env` file if you want to use a custom database. By default an in-memory SQLite database is used.

```
DATABASE_URL=postgres://user:pass@localhost:5432/snakes
PORT=3000
```

Run the server:

```
node app.js
```

## Endpoints

- `POST /games` – create a new game
- `GET /games` – list games
- `GET /games/:id` – fetch a game with players
- `PUT /games/:id` – update game status
- `DELETE /games/:id` – delete a game
- `POST /games/:id/players` – add player `{ "name": "Ana" }`
- `POST /games/:id/roll` – send dice `{ "playerId":1, "roll":4 }`
- `GET /players` – list players
- `GET /players/:id` – fetch player
- `POST /players` – create player `{ "name":"Ana", "gameId":1 }`
- `PUT /players/:id` – update player
- `DELETE /players/:id` – delete player

Authentication endpoints:

- `POST /auth/signup` – create a user `{ "email":"test@example.com", "password":"1234" }`
- `POST /auth/login` – obtain JWT token `{ "email":"test@example.com", "password":"1234" }`

User management (admin only):
- `GET /users` – list users
- `GET /users/:id` – fetch user
- `POST /users` – create user `{ "email": "user@example.com", "password": "1234", "role": "user" }`
- `PUT /users/:id` – update user
- `DELETE /users/:id` – delete user

The board size is 30 squares with a few ladders and slides defined in `routes/games.js`.

## Docker

Build and run with docker-compose to start the API and a PostgreSQL database:

```bash
docker-compose up --build
```

The Docker image is now based on the lightweight `node:20-alpine` image and uses
`npm ci --omit=dev` to install only production dependencies. This makes the
resulting container much smaller. You can build it directly with:

```bash
docker build -t snakes-ladders-api .
```

The API will be available on port `3000`.

### Deployment

An instance of this API is hosted at
[https://snakes-ladders-api.onrender.com](https://snakes-ladders-api.onrender.com).
