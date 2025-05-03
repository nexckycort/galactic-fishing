export type Inventory = {
  gold: number;
  fishes: { name: string; amount: number; xp: number; gold: number }[];
  items: { id: string; name: string; description: string }[];
};
