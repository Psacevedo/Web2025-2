# Snakes and Ladders Backend

This repository contains a small Koa API to play a simplified Snakes and Ladders game. It exposes endpoints to create games, manage players and perform rolls. Docker Compose files are included for running with PostgreSQL.

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

The API will listen on port `3000` by default. Use the routes described in `server/README.md`.

### Docker

To run the API with PostgreSQL:

```bash
docker-compose up --build
```

OpenAPI documentation is provided in `docs/swagger.yaml` which can be imported into tools like Swagger UI or Postman.
