# Snakes and Ladders

This repository contains a small example implementation of an "Escaleras y Toboganes" (Snakes and Ladders) game. It includes a Koa API with Sequelize and a simple React frontend.

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

To run the React interface:

```bash
cd client
npm install
npm run dev
```

The frontend is served on port `5173` and expects the API to run on `http://localhost:3000`.

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

Project tasks are organized in a board which can be seen at [Kanban Board](https://example.com/kanban).
