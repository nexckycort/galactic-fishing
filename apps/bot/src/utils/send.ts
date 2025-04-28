import type { Socket } from 'node:net';

import type { Events } from '../core/pub-sub.ts';

/**
 * Represents the valid items or actions that can be purchased or used.
 * Each number corresponds to a specific item or action:
 *
 * [1] Enhanced Fishing Rod - Increases chance of catching rare fish - 10000 gold
 * [2] Poison of Leveling - PERMANENTLY steals a level and XP from another player (also increases fishing interval by 30s) - 100 gold
 * [3] Poison of Delay - Increases another player's fishing interval by 30s (stacks up to 5 minutes) - 5000 gold
 * [4] Poison of Recovery - Reduces fishing interval by 30s (used to recover from poisoning) - 100000 gold
 * [5] Poison of Delay - Increases another player's fishing interval by 30s (stacks up to 5 minutes) - 5000 gold
 */
type PoisonOrBuyNumber = 1 | 2 | 3 | 4 | 5;

type Command =
  | keyof Pick<Events, '/fish' | '/inventory' | '/leader-board' | '/market'>
  | `/poison ${PoisonOrBuyNumber} ${string}`
  | `/eat ${string}`
  | `/sell ${string}`
  | `/buy ${PoisonOrBuyNumber}`;

export function send(client: Socket, command: Command) {
  client.write(`${command}\n`);
}
