import { useToast } from '@chakra-ui/react';

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
import { getUserPermissions } from '$utils/getUserPermissions';
import { getUserAge } from '$utils/getUserAge';

import { useAuth } from './AuthContext';

export interface Drink {
  uuid: string;
  name: string;
  picture: string;
  price: number;
  alcoholic: boolean;
}

export type Items = Record<
  string,
  {
    priceFormatted: string;
    amount: number;
    total: number;
    totalFormatted: string;
  } & Drink
>;

export interface NewOrder {
  drinks: Drink[];
}

export interface OrdersContextParams {
  items: Items;
  order: NewOrder;
  hasOrder: boolean;
  addDrinkToNewOrder: (drink: Drink) => boolean;
  removeDrink: (uuid: string) => void;
  clearNewOrder: () => void;
}

interface OrdersProviderProps {
  children: ReactNode;
}

export type NewOrders = Record<string, NewOrder>;

const NEW_ORDERS_KEY = '@SkyBar/NewOrders';
const MAIORITY = 18;

export interface AddDrinkToNewOrderParams {
  drink: Drink;
  email: string;
}

export const OrdersContext = createContext({} as OrdersContextParams);

export function OrdersProvider({ children }: OrdersProviderProps) {
  const [items, setItems] = useState<Items>({});
  const [newOrders, setNewOrders] = useState<NewOrders>({} as NewOrders);
  const toast = useToast();

  const { user } = useAuth();

  const email = String(user?.email);

  const { isUser } = getUserPermissions(user?.role);

  const hasOrder = Object.keys(items || {}).length > 0;
  const order = email ? newOrders[email] : { drinks: [] };

  useEffect(() => {
    const newOrders = Repository.get<NewOrders>(NEW_ORDERS_KEY) || {
      [email]: { drinks: [] },
    };

    if (!newOrders[email]) {
      newOrders[email] = { drinks: [] };
    }

    setNewOrders(newOrders);

    const newOrder = newOrders[email];

    if (newOrder) {
      const drinksItems = newOrder.drinks.reduce((items, drink) => {
        const item = items[drink.uuid];

        if (item) {
          return {
            ...items,
            [drink.uuid]: {
              ...item,
              total: drink.price * (item.amount + 1),
              totalFormatted: formatAmount(drink.price * (item.amount + 1)),
              amount: item.amount + 1,
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
      }, {} as Items);

      setItems(drinksItems);
    }
  }, [email]);

  const addDrinkToNewOrder = useCallback(
    (drink: Drink) => {
      if (!isUser) {
        toast({
          status: 'warning',
          title: 'Bebida não adicionada',
          isClosable: true,
          duration: 5000,
          description:
            'É necessário ser um usuário para adicionar bebidas ao pedido',
        });

        return false;
      }

      const userAge = getUserAge(user?.birthDay);

      if (userAge < MAIORITY && drink.alcoholic) {
        toast({
          status: 'warning',
          title: 'Bebida não adicionada',
          isClosable: true,
          duration: 5000,
          description:
            'Você precisa ser maior de idade para adicionar uma bebida alcoólica.',
        });

        return false;
      }

      newOrders[email].drinks.push(drink);

      Repository.save(NEW_ORDERS_KEY, newOrders);

      setItems((items) => {
        const item = items[drink.uuid];

        if (item) {
          return {
            ...items,
            [drink.uuid]: {
              ...item,
              total: drink.price * (item.amount + 1),
              totalFormatted: formatAmount(drink.price * (item.amount + 1)),
              amount: item.amount + 1,
            },
          };
        }

        return {
          ...items,
          [drink.uuid]: {
            ...drink,
            total: drink.price,
            priceFormatted: formatAmount(drink.price),
            totalFormatted: formatAmount(drink.price),
            amount: 1,
          },
        };
      });

      return true;
    },
    [email, newOrders, isUser, toast, user],
  );

  const clearNewOrder = useCallback(() => {
    Repository.save(NEW_ORDERS_KEY, {
      ...newOrders,
      [email]: { drinks: [] },
    });

    setNewOrders({
      ...newOrders,
      [email]: { drinks: [] },
    });

    setItems({});
  }, [email, newOrders]);

  const removeDrink = useCallback(
    (uuid: string) => {
      const drinkIndex = newOrders[email].drinks.findIndex(
        (drink) => drink.uuid === uuid,
      );

      const drinks = newOrders[email].drinks.filter(
        (_, index) => index !== drinkIndex,
      );

      setNewOrders((newOrders) => ({ ...newOrders, [email]: { drinks } }));

      Repository.save(NEW_ORDERS_KEY, {
        ...newOrders,
        [email]: { drinks },
      });

      setItems((items) => {
        const { [uuid]: item, ...otherItems } = items;

        if (item.amount === 1) {
          return otherItems;
        }

        return Object.keys(items).reduce((newItems, key) => {
          const value = items[key];

          if (value.uuid === uuid) {
            return {
              ...newItems,
              [key]: {
                ...value,
                total: item.price * (item.amount - 1),
                totalFormatted: formatAmount(item.price * (item.amount - 1)),
                amount: value.amount - 1,
              },
            };
          }

          return { ...newItems, [key]: value };
        }, {});
      });
    },
    [newOrders, email],
  );

  return (
    <OrdersContext.Provider
      value={{
        items,
        order,
        hasOrder,
        removeDrink,
        addDrinkToNewOrder,
        clearNewOrder,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
}

export function useOrders() {
  return useContext(OrdersContext);
}
