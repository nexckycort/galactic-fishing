import { connectToGame } from './client/connection-game.ts';
import { setupConsoleClient } from './client/console.ts';
import { graphFacebookApi } from './client/graph-facebook.ts';
import { startFishingLoop } from './commands/fish.ts';
import { handleInventoryActions } from './commands/inventory.ts';
import { usePoisonAgainstTopPlayer } from './commands/leaderboard.ts';
import { HOST, PORT } from './config/environment.ts';
import { pubSub } from './core/pub-sub.ts';
import { logger } from './utils/logger.ts';
import { send } from './utils/send.ts';

setupConsoleClient();
const client = connectToGame(HOST, PORT);

pubSub.subscribe('connection:open', (message) => {
  logger.success(message);
  graphFacebookApi.sendMessage(message);
});

pubSub.subscribe('connection:closed', (message) => {
  logger.warn(message);
  graphFacebookApi.sendMessage(message);
  process.exit(1);
});

pubSub.subscribe('connection:error', (message) => {
  logger.error(message);
  graphFacebookApi.sendMessage(message);
  process.exit(1);
});

pubSub.subscribe('fishing:ready', () => {
  startFishingLoop(client);
});

pubSub.subscribe('/inventory', (inventory) => {
  handleInventoryActions(inventory, client);
});

pubSub.subscribe('/leader-board', (players) => {
  usePoisonAgainstTopPlayer(players, client);
});

pubSub.subscribe('command:manual', (command) => {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  send(client, command as any);
});

setInterval(
  () => {
    graphFacebookApi.sendMessage('we continue on fire');
  },
  2 * 60 * 60 * 1000,
);
