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
- Rules and protocol: [`docs/rules.md`](docs/rules.md)
- Usage guide for usuarios y administradores: [`docs/guide.md`](docs/guide.md)

### Deployment

The API is deployed at [https://snakes-ladders-api.onrender.com](https://snakes-ladders-api.onrender.com).
To deploy your own copy, create a web service on Render using the `server` directory
and set `DATABASE_URL` to a PostgreSQL instance. The service should run
`node app.js` as the start command.

The React client is published via Netlify at
[https://snakes-ladders.netlify.app](https://snakes-ladders.netlify.app).
To deploy it yourself, copy the provided `netlify.toml` and run:

```bash
npm install --prefix client
netlify deploy --prod
```

Netlify uses `npm run build` in the `client` folder and serves the `dist` directory.

### Kanban board

Project tasks are organized in a board which can be seen at [Kanban Board](https://trello.com/b/fakeboardid/snakes-ladders).
