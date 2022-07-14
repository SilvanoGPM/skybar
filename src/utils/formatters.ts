import type { Drink } from '$services/api/drinks';

const amountFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

export function formatAmount(amount: number) {
  return amountFormatter.format(amount);
}

export function formatDrinks(drinks: Drink[]) {
  return drinks.map((drink) => ({
    ...drink,
    priceFormatted: formatAmount(drink.price),
  }));
}
