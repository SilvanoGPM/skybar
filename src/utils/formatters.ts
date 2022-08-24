import { Items } from '$contexts/OrdersContext';
import { groupDrinks } from '$contexts/OrdersContext/getItemsInOrder';
import type { Drink } from '$services/api/drinks';
import type { Order } from '$services/api/orders';
import type { User } from '$services/api/users';

import { calculateTotalPrice } from './calculateDrinksPrice';
import { getUserAge } from './getUserAge';
import { pluralize } from './pluralize';
import { timeSince } from './timeSince';

export interface FormattedOrder extends Omit<Order, 'drinks'> {
  user: { age: string } & User;
  drinks: Items;
  total: { base: number; formatted: string };
}

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

export function formatOrder(order: Order): FormattedOrder {
  const createdAt = timeSince(new Date(order.createdAt), 'atrás');
  const updatedAt = timeSince(new Date(order.updatedAt), 'atrás');

  const user = {
    ...order.user,
    age: `${getUserAge(order.user.birthDay)} anos`,
  };

  const drinks = groupDrinks(order, false);

  const total = calculateTotalPrice(drinks);

  return { ...order, createdAt, updatedAt, user, drinks, total };
}

export function formatVolume(volume: number): string {
  if (volume >= 1000) {
    const liter = volume / 1000;
    return `${pluralize(liter, 'litro', 'litros')}.`;
  }

  return `${pluralize(volume, 'mililitro', 'mililitros')}.`;
}
