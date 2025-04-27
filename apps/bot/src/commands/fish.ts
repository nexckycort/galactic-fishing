import type { Socket } from 'node:net';

import { logger } from '../utils/logger.ts';
import { send } from '../utils/send.ts';

const MAX_FISH_PER_CYCLE = 3;

let isFishing = false;
export function startFishingLoop(client: Socket) {
  isFishing = true;
  let fishes = 0;
  const loop = setInterval(() => {
    if (!isFishing) {
      clearInterval(loop);
      return;
    }

    if (fishes < MAX_FISH_PER_CYCLE) {
      logger.success(`🎣 Pescando (${fishes + 1}/${MAX_FISH_PER_CYCLE})...`);
      send(client, '/fish');
      fishes++;
    } else {
      clearInterval(loop);
      isFishing = false;
      logger.success('🛑 Límite alcanzado, esperando cooldown...');
    }
  }, 1500);
}
