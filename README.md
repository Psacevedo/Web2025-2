# Snakes and Ladders Backend

This repository contains an example Koa API for a simplified "Escaleras y Toboganes" game. It exposes CRUD endpoints for games and players and implements basic gameplay logic.

## Quick start

1. Install dependencies

```bash
cd server
npm install
```

2. Start the development server with an in-memory SQLite database:

```bash
node app.js
```

The API listens on port `3000` by default. A description of every route is available in [`server/README.md`](server/README.md).

### Docker

To run the API with PostgreSQL:

```bash
docker-compose up --build
```

The compose file starts a Postgres container and the API using the connection string shown in `docker-compose.yml`.

### Documentation

- API specification: [`docs/swagger.yaml`](docs/swagger.yaml)
- Entity relationship diagram: [`docs/er.md`](docs/er.md)
- Example turn flow: [`docs/game_flow.json`](docs/game_flow.json)

### Deployment

You can deploy the API to a PaaS like Render. Create a web service from the `server` directory and set the environment variable `DATABASE_URL` to your managed PostgreSQL instance. The service should run `node app.js` as the start command.

### Kanban board

Project tasks are organized in a board which can be seen at `<your board url here>`.
