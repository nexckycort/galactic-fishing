import type { Socket } from 'node:net';

import { graphFacebookApi } from '../client/graph-facebook.ts';
import type { Inventory } from '../types/inventory.ts';
import { logger } from '../utils/logger.ts';
import { send } from '../utils/send.ts';

function processFishQueue(
  client: Socket,
  queue: { type: 'eat' | 'sell'; name: string; xp: number; gold: number }[],
  index = 0,
) {
  if (index >= queue.length) return;

  const { type, name, xp, gold } = queue[index];
  if (type === 'eat') {
    logger.success(`🍽️ Comiendo ${name} (XP: ${xp}, Gold: ${gold})`);
    send(client, `/eat ${name}`);
  } else {
    logger.success(`💰 Vendiendo ${name} (XP: ${xp}, Gold: ${gold})`);
    send(client, `/sell ${name}`);
  }

  setTimeout(() => {
    processFishQueue(client, queue, index + 1);
  }, 1500);
}

export function handleInventoryActions(inventory: Inventory, client: Socket) {
  const { fishes, gold, items } = inventory;

  if (fishes.length > 100) {
    graphFacebookApi.sendMessage(JSON.stringify(inventory, null, 2));
    send(client, '/market');
  }

  if (gold > 1000) {
    send(client, '/market');
    return;
  }

  if (items.length >= 1) {
    send(client, '/leader-board');
    return;
  }

  if (fishes.length > 1000) {
    const fullQueue = fishes.map(
      (f) =>
        ({
          ...f,
          type: f.xp / f.gold > 1.5 ? 'eat' : 'sell',
        }) as const,
    );
    processFishQueue(client, fullQueue);
  }
}
