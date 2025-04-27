import type { Socket } from 'node:net';

import { graphFacebookApi } from '../client/graph-facebook.ts';
import type { Player } from '../types/player.ts';
import { logger } from '../utils/logger.ts';
import { send } from '../utils/send.ts';

export function usePoisonAgainstTopPlayer(players: Player[], client: Socket) {
  const otherPlayers = players.filter(
    (player) => !player.name.includes('nexckycort') && player.level > 1,
  );

  const highestLevelPlayer = otherPlayers.reduce((highest, current) => {
    return current.level > highest.level ? current : highest;
  }, players[0]);
  if (!highestLevelPlayer) return;

  const { name, level } = highestLevelPlayer;
  setTimeout(() => {
    const message = `💀 Usando Poison of Leveling contra: ${name} - ${level}`;
    logger.success(message);
    graphFacebookApi.sendMessage(message);
    send(client, `/poison 1 ${name}`);
  }, 1000);
}
