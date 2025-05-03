# Technical Test (40%)

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

## Game Mechanics & Rules (40%)

Remember, at the final bell, the player who has reached the highest level (with
the most gold as a tiebreaker) will be crowned the champion of the stars. But
the real prize? That could be a permanent spot on our engineering team... 🌌✨

> Credentials and access instructions sent after invitation acceptance

### How the game works (plain and simple)

1. **Fish** — Type `/fish` to cast your line. You can do this **three times** in
   a row, then wait **30 seconds** before fishing again.
2. **Check your catch** — `/inventory` shows each fish’s rarity, XP, and gold
   value.
3. **Decide**
   - `/eat <fish>` to turn the fish into XP and level up.
   - `/sell <fish>` (or `/sell all`) to gain gold.
4. **Buy or sabotage** — Spend gold in `/market` on:
   - **Enhanced Fishing Rod** — better odds for rare fish.
   - **Poison of Leveling** — permanently steals 1 level (+ that XP) from a
     rival and slows their fishing by 30 s.
   - **Poison of Delay** — adds 30 s to someone’s fishing cooldown (stacks up to
     5 min).
   - **Poison of Recovery** — removes 30 s of your own cooldown.

   <aside>
    💡

   For more information /help

   </aside>

5. **Climb the leaderboard** — Levels decide rank; gold breaks ties.

### Extra Rules

- **Dynamic market** — Item prices can change, and limited-time items may appear
  without notice.
- **Alliances are allowed** — `/send-money <amount> <user>` to fund friends;
  `/message <text>` to chat (costs 100 gold).
