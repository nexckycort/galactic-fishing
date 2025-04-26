const COLORS = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m',
  gray: '\x1b[90m',
};

const BOT_PREFIX = `${COLORS.magenta}[GF-BOT]${COLORS.reset}`;

type LogType = 'info' | 'warn' | 'error' | 'success';

const prefixMap: Record<LogType, string> = {
  info: `${COLORS.cyan}[INFO]${COLORS.reset}`,
  warn: `${COLORS.yellow}[WARN]${COLORS.reset}`,
  error: `${COLORS.red}[ERROR]${COLORS.reset}`,
  success: `${COLORS.green}[OK]${COLORS.reset}`,
};

function log(type: LogType, msg: string) {
  const timestamp = `${COLORS.gray}${new Date().toLocaleTimeString()}${COLORS.reset}`;
  console.log(`${BOT_PREFIX} ${prefixMap[type]} ${timestamp} ${msg}`);
}

export const logger = {
  info: (msg: string) => log('info', msg),
  warn: (msg: string) => log('warn', msg),
  error: (msg: string) => log('error', msg),
  success: (msg: string) => log('success', msg),
};
