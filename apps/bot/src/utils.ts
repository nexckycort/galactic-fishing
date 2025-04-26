import type { Socket } from 'node:net';

import { logger } from './logger.ts';

function parseInventory(raw: string): {
  gold: number;
  fishes: { name: string; xp: number; gold: number }[];
  items: { id: string; name: string; description: string }[];
} {
  const lines = raw.split('\n');

  const goldLine = lines.find((line) => line.startsWith('Gold:'));
  const gold = goldLine
    ? Number.parseInt(goldLine.replace('Gold:', '').trim())
    : 0;

  const fishLines = lines.filter((line) => line.includes(' - x'));
  const fishes = fishLines
    .map((line) => {
      const match = line.match(
        /(.+?)\s\(.+?\)\s-\sx\d+\s-\sXP:\s(\d+),\sGold:\s(\d+)/,
      );
      if (!match) return null;
      const [, name, xp, gold] = match;
      return {
        name: name.trim(),
        xp: Number(xp),
        gold: Number(gold),
      };
    })
    .filter(Boolean) as { name: string; xp: number; gold: number }[];

  const itemStartIndex = lines.findIndex((line) => line.startsWith('Items:'));
  const itemLines = lines.slice(itemStartIndex + 1);
  const items = itemLines
    .map((line) => {
      const match = line.match(/^([a-f0-9-]+): (.+?) - (.+)$/);
      if (!match) return null;
      const [, id, name, description] = match;
      return { id, name, description };
    })
    .filter(Boolean) as { id: string; name: string; description: string }[];

  return { gold, fishes, items };
}

function removeAnsiCodes(str: string): string {
  return str.replace(/\x1B\[[0-9;]*m/g, '');
}

type Player = {
  name: string;
  level: number;
};

export function parseTopPlayers(raw: string): Player[] {
  const lines = raw.split('\n');

  const playerLines = lines.filter((line) =>
    /^(\d+\.|[🥇🥈🥉])\s/u.test(removeAnsiCodes(line)),
  );

  const players = playerLines
    .map((line) => {
      const cleanLine = removeAnsiCodes(line);
      const match = cleanLine.match(/([\w\d_]+)\s+- Level (\d+)/);
      if (!match) return null;

      const [, name, level] = match;
      return {
        name,
        level: Number.parseInt(level, 10),
      };
    })
    .filter(Boolean) as Player[];

  return players;
}

export function send(client: Socket, command: string) {
  client.write(`${command}\n`);
}

export function extractCooldownSeconds(message: string): number | null {
  const match = message.match(/(\d+) seconds/);
  return match ? Number.parseInt(match[1], 10) : null;
}

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

export function handleInventory(client: Socket, raw: string) {
  const { gold, fishes, items } = parseInventory(raw);

  const fullQueue = fishes.map(
    (f) =>
      ({
        ...f,
        type: f.xp / f.gold > 1.5 ? 'eat' : 'sell',
      }) as const,
  );

  if (gold > 100) {
    send(client, '/market');
    return;
  }

  if (items.length >= 1) {
    send(client, '/leader-board');
    return;
  }

  processFishQueue(client, fullQueue);
}
