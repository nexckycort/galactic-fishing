export function removeAnsiCodes(str: string): string {
  // biome-ignore lint/suspicious/noControlCharactersInRegex: <explanation>
  return str.replace(/\x1B\[[0-9;]*m/g, '');
}
