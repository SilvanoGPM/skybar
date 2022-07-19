import { intervalToDuration } from 'date-fns';

export function getUserAge(birth?: string) {
  return birth
    ? intervalToDuration({ start: new Date(birth), end: new Date() }).years || 0
    : 0;
}
