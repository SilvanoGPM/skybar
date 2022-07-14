import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import Repository from '$libs/Repository';
import { formatAmount } from '$utils/formatters';

import { useAuth } from './AuthContext';

export interface Drink {
  uuid: string;
  name: string;
  picture: string;
  price: number;
}

export type Items = Record<
  string,
  { priceFormatted: string; amount: number } & Drink
>;

export interface NewOrder {
  drinks: Drink[];
}

interface OrdersContextParams {
  items: Items;
  addDrinkToNewOrder: (drink: Drink) => void;
  clearNewOrder: () => void;
}

interface OrdersProviderProps {
  children: ReactNode;
}

export type NewOrders = Record<string, NewOrder>;

const NEW_ORDERS_KEY = '@SkyBar/NewOrders';

export interface AddDrinkToNewOrderParams {
  drink: Drink;
  email: string;
}

export const OrdersContext = createContext({} as OrdersContextParams);

export function OrdersProvider({ children }: OrdersProviderProps) {
  const [items, setItems] = useState<Items>({});
  const [newOrders, setNewOrders] = useState<NewOrders>({} as NewOrders);

  const { user } = useAuth();

  const email = String(user?.email);

  useEffect(() => {
    const newOrders = Repository.get<NewOrders>(NEW_ORDERS_KEY) || {
      [email]: { drinks: [] },
    };

    setNewOrders(newOrders);

    const newOrder = newOrders[email];

    if (newOrder) {
      const drinksItems = newOrder.drinks.reduce((items, drink) => {
        const item = items[drink.uuid];

        if (item) {
          return {
            ...items,
            [drink.uuid]: { ...item, amount: item.amount + 1 },
          };
        }

        return {
          ...items,
          [drink.uuid]: {
            ...drink,
            priceFormatted: formatAmount(drink.price),
            amount: 1,
          },
        };
      }, {} as Items);

      setItems(drinksItems);
    }
  }, [email]);

  const addDrinkToNewOrder = useCallback(
    (drink: Drink) => {
      newOrders[email].drinks.push(drink);

      Repository.save(NEW_ORDERS_KEY, newOrders);

      setItems((items) => {
        const item = items[drink.uuid];

        if (item) {
          return {
            ...items,
            [drink.uuid]: { ...item, amount: item.amount + 1 },
          };
        }

        return {
          ...items,
          [drink.uuid]: {
            ...drink,
            priceFormatted: formatAmount(drink.price),
            amount: 1,
          },
        };
      });
    },
    [email, newOrders],
  );

  const clearNewOrder = useCallback(() => {
    Repository.save(NEW_ORDERS_KEY, {
      ...newOrders,
      [email]: { drinks: [] },
    });

    setItems({});
  }, [email, newOrders]);

  return (
    <OrdersContext.Provider
      value={{ items, addDrinkToNewOrder, clearNewOrder }}
    >
      {children}
    </OrdersContext.Provider>
  );
}

export function useOrders() {
  return useContext(OrdersContext);
}
