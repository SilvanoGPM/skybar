import { formatAmount } from './formatters';

export function calculateListPrice(list: Array<{ price: number }>) {
  const total = list.reduce((total, { price }) => total + price, 0);

  return formatAmount(total);
}
