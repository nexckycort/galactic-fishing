import type { Inventory } from '../types/inventory.ts';

export function parseInventory(raw: string): Inventory {
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
