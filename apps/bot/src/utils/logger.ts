import { COLORS } from './colors.ts';

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
