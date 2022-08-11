const intervals = [
  { label: ['ano', 'anos'], seconds: 31536000 },
  { label: ['mês', 'meses'], seconds: 2592000 },
  { label: ['dia', 'dias'], seconds: 86400 },
  { label: ['hora', 'horas'], seconds: 3600 },
  { label: ['min', 'mins'], seconds: 60 },
  { label: ['seg', 'segs'], seconds: 1 },
];

export function timeSince(date: Date, suffix = '') {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);

  const interval =
    intervals.find((interval) => interval.seconds < seconds) ||
    intervals[intervals.length - 1];

  const count = Math.floor(seconds / interval.seconds);
  const label = count === 1 ? interval.label[0] : interval.label[1];

  return `${count} ${label} ${suffix}`;
}
