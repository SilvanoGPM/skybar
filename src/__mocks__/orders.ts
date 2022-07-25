import * as OrdersContext from '$contexts/OrdersContext';

const defaultData = { hasOrder: true };

export function createUseOrders(
  data: Partial<OrdersContext.OrdersContextParams> = defaultData,
) {
  jest.spyOn(OrdersContext, 'useOrders').mockReturnValue(data as any); // eslint-disable-line @typescript-eslint/no-explicit-any
}
