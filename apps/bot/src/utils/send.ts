import type { Socket } from 'node:net';

import type { Events } from '../core/pub-sub.ts';

type Command = keyof Pick<Events, '/fish' | '/inventory' | '/leader-board'>;

export function send(client: Socket, command: Command) {
  client.write(`${command}\n`);
}
