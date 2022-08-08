import { httpClient } from '$services/httpClient';
import { Drink } from './drinks';

interface Order {
  uuid: string;
  drinks: Drink[];
  table?: unknown;
}

interface OrderToCreate {
  drinks: Array<{ uuid: string }>;
  table?: { uuid: string };
}

export async function createOrder(order: OrderToCreate) {
  const { data } = await httpClient.post<Order>('/requests/user', order);

  return data;
}
