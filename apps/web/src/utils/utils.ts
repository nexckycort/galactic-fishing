export const doc = document;

export function isMobileScreen() {
  return window.matchMedia('(max-width: 768px)').matches;
}
