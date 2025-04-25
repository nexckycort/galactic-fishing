## Technical Test

**Objective**

Build a lightweight single-page web app that displays the live **leaderboard**
and **market**.

### Endpoints

```json
GET https://example.com/game/leaderboard
{
  "players": [
    { "rank": 1, "username": "tester", "level": 5, "xp": 139, "gold": 15 },
    { "rank": 2, "username": "admin", "level": 10, "xp": 0,  "gold": 800 }
  ]
}
```

```json
GET https://example.com/game/market
{
  "items": [
    { "id": "e0ed…", "name": "Enhanced Fishing Rod", "type": "fishing_rod",   "description": "Increases chance of catching rare fish",                                              "cost": 10000 },
    { "id": "94be…", "name": "Poison of Leveling",  "type": "poison_leveling", "description": "PERMANENTLY steals a level and XP from another player (also increases fishing interval by 30 s)", "cost":   100 },
    { "id": "c815…", "name": "Poison of Delay",     "type": "poison_delay",    "description": "Increases another player's fishing interval by 30 s (stacks up to 5 minutes)",              "cost":  5000 },
    { "id": "03b9…", "name": "Poison of Recovery",  "type": "poison_recovery", "description": "Reduces fishing interval by 30 s (use to recover from poisoning)",                           "cost": 100000 }
  ]
}
```

### Evaluation Criteria

| What we check              | Details                                          |
| -------------------------- | ------------------------------------------------ |
| **Tiny bundle**            | `dist/` size (gzipped) – smaller wins ties       |
| **Works offline**          | Must load & function after Wi-Fi is disabled     |
| **Responsive & beautiful** | Looks sharp on phone, tablet, and 4 K            |
| **Stack freedom**          | Any framework or vanilla JS/TS; host anywhere    |
| **Submission**             | Url deployment + Github-repo via submission page |

> Hint — PWA + Service Worker helps with offline support.
