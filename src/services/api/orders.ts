import { httpClient } from '$services/httpClient';
import { Drink } from './drinks';

interface Order {
  drinks: Drink[];
  table?: unknown;
}

interface OrderToCreate {
  drinks: Array<{ uuid: string }>;
  table?: { uuid: string };
}

export async function createOrder(order: OrderToCreate) {
  await httpClient.post<Order>('/requests/user', order);
}
