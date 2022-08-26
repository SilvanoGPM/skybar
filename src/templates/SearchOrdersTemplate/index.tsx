import { searchOrders } from '$services/api/orders';
import { OrdersSearchLayout } from '$templates/shared/OrdersSearchLayout';

export function SearchOrdersTemplate() {
  return (
    <OrdersSearchLayout
      title="Pesquisar pedidos"
      searchOrders={searchOrders}
      queryOptions={{
        key: 'searchOrders',
        staleTime: 1000 * 60 * 30, // 30 minutes
      }}
    />
  );
}
