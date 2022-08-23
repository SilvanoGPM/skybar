import { formatAmount } from './formatters';

export function calculateListPrice(list: Array<{ price: number }>) {
  const total = list.reduce((total, { price }) => total + price, 0);

  return formatAmount(total);
}

export function calculateTotalPrice(
  items: Record<string, { price: number; amount: number }>,
) {
  const price = Object.values(items).reduce(
    (total, { price, amount }) => total + price * amount,
    0,
  );

  return { base: price, formatted: formatAmount(price) };
}
