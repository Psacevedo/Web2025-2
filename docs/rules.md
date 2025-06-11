# Game Rules and Protocol

This document describes the basic rules of the Snakes and Ladders game and the JSON protocol used by the API.

## Rules

 - The board has 100 squares numbered from 1 to 100.
- Players start at position 0 and take turns rolling a die from 1 to 6.
- If a player lands on the bottom of a ladder they climb to its top.
- If a player lands on the head of a slide they go down to its tail.
 - A player must roll the exact number needed to reach square 100 to win.

Ladders and slides used in this implementation:

| Start | End | Type   |
|-------|-----|--------|
| 4     | 14  | ladder |
| 9     | 31  | ladder |
| 20    | 38  | ladder |
| 28    | 84  | ladder |
| 40    | 59  | ladder |
| 63    | 81  | ladder |
| 71    | 91  | ladder |
| 16    | 6   | snake  |
| 47    | 26  | snake  |
| 49    | 11  | snake  |
| 56    | 53  | snake  |
| 62    | 19  | snake  |
| 64    | 60  | snake  |
| 87    | 24  | snake  |
| 93    | 73  | snake  |
| 95    | 75  | snake  |
| 98    | 78  | snake  |

## Protocol

All endpoints accept and return JSON. Authentication uses a JWT in the `Authorization` header: `Bearer <token>`.

### Example Requests

Create game:
```http
POST /games
```
Response:
```json
{ "id": 1, "status": "waiting" }
```

Join game:
```http
POST /games/1/players
{ "name": "Ana" }
```
Response:
```json
{ "id": 1, "name": "Ana", "gameId": 1, "position": 0 }
```

Roll dice:
```http
POST /games/1/roll
{ "playerId": 1, "roll": 4 }
```
Response:
```json
{ "position": 4 }
```

Full flow examples can be found in [game_flow.json](game_flow.json).
