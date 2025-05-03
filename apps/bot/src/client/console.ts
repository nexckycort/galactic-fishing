import * as readline from 'node:readline';

import { pubSub } from '../core/pub-sub.ts';
import { gameState } from '../state/game-state.ts';

export function setupConsoleClient() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const commands: Record<string, (() => void) | undefined> = {
    exit: () => {
      console.log('👋 Cerrando cliente...');
      rl.close();
      process.exit(0);
    },
    stop: () => {
      console.log('⏸ Juego pausado.');
      gameState.stop = true;
    },
    start: () => {
      console.log('▶️ Juego reanudado.');
      gameState.stop = false;
    },
    status: () => {
      console.log(
        `📊 Estado actual: ${gameState.stop ? '⛔️ Detenido' : '🚀 En ejecución'}`,
      );
    },
  };

  rl.on('line', (input) => {
    const command = input.trim();

    const action = commands[command];
    if (action) {
      action();
    } else {
      console.log(`executing command: ${command}`);
      pubSub.publish('command:manual', command);
    }
  });
}
