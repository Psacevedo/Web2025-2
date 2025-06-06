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
- `POST /games/:gameId/players` – join a player to a game `{ "name": "Ana" }`
- `POST /games/:gameId/roll` – send a dice roll `{ "playerId":1, "roll":4 }`
- `GET /games/:gameId` – fetch game state including players

The board size is 30 squares with a few ladders and slides defined in `routes/games.js`.
