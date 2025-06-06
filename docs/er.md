# Data Model

```mermaid
erDiagram
  Game ||--o{ Player : has
  Game {
    int id PK
    string status
  }
  Player {
    int id PK
    string name
    int position
    int gameId FK
  }
```
