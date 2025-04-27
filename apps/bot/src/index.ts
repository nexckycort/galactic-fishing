import { connectToGame } from './client/connection.ts';
import { startFishingLoop } from './commands/fish.ts';
import { HOST, PORT } from './config/constants.ts';
import { pubSub } from './core/pub-sub.ts';
import { logger } from './utils/logger.ts';

const client = connectToGame(HOST, PORT);

pubSub.subscribe('connection:open', (message) => {
  logger.success(message);
});

pubSub.subscribe('connection:closed', (message) => {
  logger.warn(message);
});

pubSub.subscribe('connection:error', (message) => {
  logger.error(message);
});

pubSub.subscribe('fishing:ready', () => {
  startFishingLoop(client);
});
