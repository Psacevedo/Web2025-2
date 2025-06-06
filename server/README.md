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

The board size is 30 squares with a few ladders and slides defined in `routes/games.js`.

## Docker

Build and run with docker-compose to start the API and a PostgreSQL database:

```bash
docker-compose up --build
```

The API will be available on port `3000`.
