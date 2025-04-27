import { createConnection } from 'node:net';

import { CODE } from '../config/environment.ts';
import { pubSub } from '../core/pub-sub.ts';
import { logger } from '../utils/logger.ts';
import { send } from '../utils/send.ts';
import { extractCooldownSeconds } from '../utils/timers.ts';

const PROMPT_REGEX = /@shadow-net:~\$\s*$/;

let canFish = false;
let fishing = false;
export function connectToGame(host: string, port: number) {
  const client = createConnection({ host, port });

  client.on('data', (data) => {
    const message = data.toString();
    console.log(message);

    if (message.includes('Enter your Operative ID (invite code):')) {
      pubSub.publish('connection:open', '🌌 Conectado al servidor');
      send(client, CODE);
      canFish = true;
      return;
    }

    const cooldownSeconds = extractCooldownSeconds(message);
    if (cooldownSeconds !== null) {
      canFish = false;
      logger.success(`⏳ Cooldown de ${cooldownSeconds} segundos...`);

      setTimeout(() => {
        canFish = true;
        logger.success('✅ Cooldown terminado. Reanudando pesca...');
        pubSub.publish('fishing:ready', 'Done');
      }, cooldownSeconds * 1000);

      return;
    }

    if (PROMPT_REGEX.test(message) && canFish && !fishing) {
      fishing = true;
      pubSub.publish('fishing:ready', 'Done');
      return;
    }
  });

  client.on('end', () => {
    pubSub.publish('connection:closed', '📴 Conexión cerrada por el servidor');
  });

  client.on('error', (err) => {
    pubSub.publish(
      'connection:error',
      `❌ Error en la conexión: ${err.message}`,
    );
  });

  return client;
}
