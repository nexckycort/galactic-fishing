export const HOST = 'game.bloque.app';
export const PORT = 2812;
export const MAX_FISH_PER_CYCLE = 3;
export const PROMPT_REGEX = /@shadow-net:~\$\s*$/;

export const COLORS = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m',
  gray: '\x1b[90m',
};

export const BOT_PREFIX = `${COLORS.magenta}[GF-BOT]${COLORS.reset}`;
