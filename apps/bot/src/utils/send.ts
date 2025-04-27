import type { Socket } from 'node:net';

type Command = '/inventory' | '/fish';

export function send(client: Socket, command: Command) {
  client.write(`${command}\n`);
}
