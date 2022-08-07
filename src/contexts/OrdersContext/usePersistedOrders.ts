import { useBoolean } from '@chakra-ui/react';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import Repository from '$libs/Repository';

import { PersistedOrders } from '.';

const PERSISTED_ORDERS_KEY = '@SkyBar/PersistedOrders';

type UsePersistedOrdersReturn = [
  PersistedOrders,
  Dispatch<SetStateAction<PersistedOrders>>,
];

export function usePersistedOrders(email: string): UsePersistedOrdersReturn {
  const [orders, setOrders] = useState<PersistedOrders>({} as PersistedOrders);
  const [isLoading, setIsLoading] = useBoolean(true);

  useEffect(() => {
    function loadOrders() {
      if (!email) {
        return;
      }

      const orders = Repository.get<PersistedOrders>(PERSISTED_ORDERS_KEY) || {
        [email]: { drinks: [] },
      };

      if (!orders[email]) {
        orders[email] = { drinks: [] };
      }

      setOrders(orders);

      setIsLoading.off();
    }

    loadOrders();
  }, [email, setIsLoading]);

  useEffect(() => {
    if (!isLoading) {
      Repository.save(PERSISTED_ORDERS_KEY, orders);
    }
  }, [orders, isLoading]);

  return [orders, setOrders];
}
