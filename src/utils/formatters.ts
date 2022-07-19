import type { Drink } from '$services/api/drinks';
import { pluralize } from './pluralize';

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

export function formatVolume(volume: number): string {
  if (volume >= 1000) {
    const liter = volume / 1000;
    return `${pluralize(liter, 'litro', 'litros')}.`;
  }

  return `${pluralize(volume, 'mililitro', 'mililitros')}.`;
}
