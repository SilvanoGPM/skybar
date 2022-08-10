import { Flex, Heading } from '@chakra-ui/react';

import { Breadcrumbs } from '$components/ui/Breadcrumbs';
import { DefaultLayout } from '$components/ui/DefaultLayout';
import { Order } from '$services/api/orders';
import { OneLineText } from '$components/ui/OneLineText';

import { OrderStatus } from './OrderStatus';
import { orderStatus } from './orderStatusOptions';

export interface ViewOrderTemplateProps {
  isOwner: boolean;
  isStaff: boolean;
  order: Order;
}

export function ViewOrderTemplate({ order }: ViewOrderTemplateProps) {
  const orderStatusOptions = orderStatus[order.status];

  return (
    <DefaultLayout>
      <Flex direction="column" flex="1">
        <Breadcrumbs
          items={[
            { href: '/', label: 'Início' },
            { href: '/orders', label: 'Pedidos' },
            { href: '#', label: 'Visualizar pedido' },
          ]}
        />

        <Flex
          direction="column"
          flex="1"
          rounded="xl"
          padding={['4', '4', '8']}
          _dark={{ bg: 'gray.800', color: 'gray.50' }}
          _light={{ bg: 'gray.100', color: 'gray.900' }}
        >
          <Heading>Pedido</Heading>

          <OneLineText
            fontSize={{ base: 'x-small', md: 'sm' }}
            display="inline-block"
            color="gray.500"
            mb="8"
            maxW={{ base: '250px', md: '100%' }}
          >
            {order.uuid}
          </OneLineText>

          <OrderStatus {...orderStatusOptions} />
        </Flex>
      </Flex>
    </DefaultLayout>
  );
}
