import type { Socket } from 'node:net';

export function send(client: Socket, command: string) {
  client.write(`${command}\n`);
}
