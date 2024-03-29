import qs from 'query-string';

import { httpClient } from '$services/httpClient';

import { Drink } from './drinks';
import { User } from './users';

export type StatusItems = 'PROCESSING' | 'STARTED' | 'FINISHED' | 'CANCELED';

export interface Order {
  uuid: string;
  createdAt: string;
  updatedAt: string;
  drinks: Drink[];
  user: User;
  table?: unknown;
  status: StatusItems;
  delivered: boolean;
}

export interface OrderSearchParams {
  status?: StatusItems;
  drinkName?: string;
  drinkDescription?: string;
  createdAt?: string;
  createdInDateOrAfter?: string;
  createdInDateOrBefore?: string;
  price?: number;
  lessThanOrEqualToTotalPrice?: number;
  greaterThanOrEqualToTotalPrice?: number;
  userCpf?: string;
  userEmail?: string;
  userName?: string;
  delivered?: number;
  sort?: string;
  page?: number;
  size?: number;
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

export async function cancelOrder(uuid: string): Promise<void> {
  await httpClient.patch(`/requests/all/cancel/${uuid}`);
}

export async function startOrder(uuid: string): Promise<void> {
  await httpClient.patch(`/requests/staff/start/${uuid}`);
}

export async function finishOrder(uuid: string): Promise<void> {
  await httpClient.patch(`/requests/staff/finish/${uuid}`);
}

export async function deliverOrder(uuid: string): Promise<void> {
  await httpClient.patch(`/requests/staff/deliver/${uuid}`);
}

export async function searchOrders(params: OrderSearchParams = {}) {
  const searchParams = qs.stringify(params);

  const { data } = await httpClient.get<Paginated<Order>>(
    `/requests/staff/search?${searchParams}`,
  );

  return data;
}

export async function getOrdersToManage({
  status,
  size,
  page,
}: Pick<OrderSearchParams, 'status' | 'size' | 'page'>) {
  return searchOrders({
    sort: 'updatedAt,desc',
    status,
    page,
    size,
  });
}

export async function getMyOrders(params: OrderSearchParams = {}) {
  const searchParams = qs.stringify(params);

  const { data } = await httpClient.get<Paginated<Order>>(
    `/requests/user/my-requests?${searchParams}`,
  );

  return data;
}
