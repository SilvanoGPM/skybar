export function getFirstString(str?: string, separator = ' ') {
  return str?.split(separator)[0] || '';
}
