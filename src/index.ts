import './global.css';

import { fetchAndRenderMarket } from './components/market';
import { fetchAndLeaderboard } from './components/leaderboard';

const terminal = document.getElementById('terminal') as HTMLElement;
const cmdInput = document.getElementById('cmd') as HTMLInputElement;

const log = (text: string) => {
  const line = document.createElement('div');
  line.textContent = `> ${text}`;
  terminal.appendChild(line);
  terminal.scrollTop = terminal.scrollHeight;
};

async function handleMarketCommand() {
  log('Connecting to black market...');
  try {
    const market = await fetchAndRenderMarket();
    terminal.appendChild(market);
  } catch (err) {
    log('❌ Failed to connect to black market.');
  }
}

async function handleLeaderboardCommand() {
  log('Connecting to leaderboard...');
  try {
    const leaderboard = await fetchAndLeaderboard();
    terminal.appendChild(leaderboard);
  } catch (err) {
    log('❌ Failed to connect to leaderboard.');
  }
}

const commands: {
  [key: string]: (() => void | Promise<void>) | undefined;
} = {
  help: () => {
    log('Available commands:');
    log('leaderboard, ls - View hacker rankings');
    log('market, shop - Access black market');
    log('clear, cls - Clear terminal');
    log('help - Show this help message');
  },
  clear: () => {
    terminal.innerHTML = '';
  },
  cls: () => {
    terminal.innerHTML = '';
  },
  market: async () => handleMarketCommand(),
  shop: async () => handleMarketCommand(),
  leaderboard: async () => handleLeaderboardCommand(),
  ls: async () => handleLeaderboardCommand(),
};

cmdInput.addEventListener('keydown', async (e) => {
  if (e.key === 'Enter') {
    const input = cmdInput.value.trim();
    log(input);
    cmdInput.blur();

    cmdInput.value = '';

    try {
      const command = input.toLowerCase();

      const commandFunction = commands[command];
      if (commandFunction) {
        await commandFunction();
      } else {
        log(`Command not found: ${command}`);
      }
    } catch (error) {
      log(`❌ Error executing command: ${(error as Error).message}`);
    } finally {
      cmdInput.scrollIntoView({ behavior: 'smooth' });
    }
  }
});

cmdInput.addEventListener('focus', () => {
  setTimeout(() => {
    cmdInput.scrollIntoView({ behavior: 'smooth' });
  }, 200);
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .catch((err) => console.error('SW registration failed:', err));
  });
}
