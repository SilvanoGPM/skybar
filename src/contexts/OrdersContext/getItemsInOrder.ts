import { formatAmount } from '$utils/formatters';

import { Items, PersistedOrders } from '.';

export function getItemsInOrder(email: string, orders: PersistedOrders) {
  if (!email) {
    return {};
  }

  const order = orders[email] || { drinks: [] };

  return order.drinks
    .sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'))
    .reduce<Items>((items, drink) => {
      const item = items[drink.uuid];

      if (item) {
        const amount = item.amount + 1;
        const total = drink.price * amount;

        return {
          ...items,
          [drink.uuid]: {
            ...item,
            amount,
            total,
            totalFormatted: formatAmount(total),
          },
        };
      }

      return {
        ...items,
        [drink.uuid]: {
          ...drink,
          total: drink.price,
          totalFormatted: formatAmount(drink.price),
          priceFormatted: formatAmount(drink.price),
          amount: 1,
        },
      };
    }, {});
}
