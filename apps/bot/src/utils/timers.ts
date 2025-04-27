export function extractCooldownSeconds(message: string): number | null {
  const match = message.match(/(\d+) seconds/);
  return match ? Number.parseInt(match[1], 10) : null;
}
