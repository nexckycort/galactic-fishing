import type { Socket } from 'node:net';

import { gameState } from '../state/game-state.ts';
import { logger } from '../utils/logger.ts';
import { send } from '../utils/send.ts';

const MAX_FISH_PER_CYCLE = 3;

export function startFishingLoop(client: Socket) {
  gameState.isFishing = true;
  let fishes = 0;
  const loop = setInterval(() => {
    if (!gameState.isFishing) {
      clearInterval(loop);
      return;
    }

    if (fishes < MAX_FISH_PER_CYCLE) {
      logger.success(`🎣 Pescando (${fishes + 1}/${MAX_FISH_PER_CYCLE})...`);
      send(client, '/fish');
      fishes++;
    } else {
      clearInterval(loop);
      gameState.isFishing = false;
      logger.success('🛑 Límite alcanzado, esperando cooldown...');
    }
  }, 1500);
}
