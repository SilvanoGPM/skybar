import { httpClient } from '$services/httpClient';

import { Drink } from './drinks';
import { User } from './users';

export interface Order {
  uuid: string;
  drinks: Drink[];
  user: User;
  table?: unknown;
  status: 'PROCESSING' | 'STARTED' | 'FINISHED' | 'CANCELED';
  delivered: boolean;
}

interface OrderToCreate {
  drinks: Array<{ uuid: string }>;
  table?: { uuid: string };
}

export async function createOrder(order: OrderToCreate) {
  const { data } = await httpClient.post<Order>('/requests/user', order);

  return data;
}

export async function findOrderByUUID(uuid: string) {
  const { data } = await httpClient.get<Order>(`/requests/${uuid}`);
  return data;
}
