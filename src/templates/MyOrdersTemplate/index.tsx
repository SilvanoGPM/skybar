import { getMyOrders } from '$services/api/orders';

import { OrdersSearchLayout } from '$templates/shared/OrdersSearchLayout';

export function MyOrdersTemplate() {
  return (
    <OrdersSearchLayout
      title="Meus pedidos"
      searchOrders={getMyOrders}
      queryOptions={{
        key: 'myOrders',
        staleTime: 1000 * 60 * 30, // 30 minutes
      }}
    />
  );
}
