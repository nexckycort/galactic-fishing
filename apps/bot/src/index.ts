import { connectToGame } from './client/connection.ts';
import { graphFacebookApi } from './client/graph-facebook.ts';
import { startFishingLoop } from './commands/fish.ts';
import { HOST, PORT } from './config/environment.ts';
import { pubSub } from './core/pub-sub.ts';
import { logger } from './utils/logger.ts';
import { send } from './utils/send.ts';

const client = connectToGame(HOST, PORT);

pubSub.subscribe('connection:open', (message) => {
  logger.success(message);
  graphFacebookApi.sendMessage(message);
});

pubSub.subscribe('connection:closed', (message) => {
  logger.warn(message);
  graphFacebookApi.sendMessage(message);
});

pubSub.subscribe('connection:error', (message) => {
  logger.error(message);
  graphFacebookApi.sendMessage(message);
});

pubSub.subscribe('fishing:ready', () => {
  startFishingLoop(client);
});

pubSub.subscribe('/inventory', (inventory) => {
  const { fishes, items } = inventory;

  if (fishes.length > 100) {
    graphFacebookApi.sendMessage(JSON.stringify(inventory, null, 2));
  }

  if (items.length >= 1) {
    send(client, '/leader-board');
    return;
  }
});
