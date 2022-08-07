import { useToast } from '@chakra-ui/react';

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
} from 'react';

import { getUserPermissions } from '$utils/getUserPermissions';
import { getUserAge } from '$utils/getUserAge';

import { useAuth } from '../AuthContext';
import { usePersistedOrders } from './usePersistedOrders';
import { getItemsInOrder } from './getItemsInOrder';

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

export interface PersistedOrder {
  drinks: Drink[];
}

export type PersistedOrders = Record<string, PersistedOrder>;

export interface OrdersContextParams {
  items: Items;
  order: PersistedOrder;
  hasOrder: boolean;
  addDrink: (drink: Drink) => boolean;
  removeDrink: (uuid: string) => void;
  clearOrder: () => void;
}

interface OrdersProviderProps {
  children: ReactNode;
}

const MAIORITY = 18;

export interface AddDrinkToNewOrderParams {
  drink: Drink;
  email: string;
}

export const OrdersContext = createContext({} as OrdersContextParams);

export function OrdersProvider({ children }: OrdersProviderProps) {
  const toast = useToast();
  const { user } = useAuth();

  const email = user?.email || '';
  const { isUser } = getUserPermissions(user?.role);

  const [orders, setOrders] = usePersistedOrders(email);

  const items = useMemo(() => getItemsInOrder(email, orders), [email, orders]);

  const hasOrder = Object.keys(items || {}).length > 0;

  const order = useMemo(
    () => (email ? orders[email] : { drinks: [] }),
    [orders, email],
  );

  const addDrink = useCallback(
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

      const updatedOrder = { ...order, drinks: [...order.drinks, drink] };

      setOrders({
        ...orders,
        [email]: updatedOrder,
      });

      return true;
    },
    [email, orders, isUser, toast, user, order, setOrders],
  );

  const clearOrder = useCallback(() => {
    setOrders({
      ...orders,
      [email]: { drinks: [] },
    });
  }, [email, orders, setOrders]);

  const removeDrink = useCallback(
    (uuid: string) => {
      const drinkIndex = orders[email].drinks.findIndex(
        (drink) => drink.uuid === uuid,
      );

      const drinks = orders[email].drinks.filter(
        (_, index) => index !== drinkIndex,
      );

      setOrders((newOrders) => ({
        ...newOrders,
        [email]: { ...order, drinks },
      }));
    },
    [orders, email, order, setOrders],
  );

  return (
    <OrdersContext.Provider
      value={{
        items,
        order,
        hasOrder,
        removeDrink,
        addDrink,
        clearOrder,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
}

export function useOrders() {
  return useContext(OrdersContext);
}
