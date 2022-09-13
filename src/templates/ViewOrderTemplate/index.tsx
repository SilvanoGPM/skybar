import { Box, Divider, Flex, Heading, HStack, Icon } from '@chakra-ui/react';
import { BsClock } from 'react-icons/bs';
import { BiDrink } from 'react-icons/bi';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

import { Breadcrumbs } from '$components/ui/Breadcrumbs';
import { DefaultLayout } from '$components/ui/DefaultLayout';
import { OneLineText } from '$components/ui/OneLineText';
import { pluralize } from '$utils/pluralize';
import type { Order as BaseOrder } from '$services/api/orders';
import type { User } from '$services/api/users';
import type { Items } from '$contexts/OrdersContext';

import { OrderStatus } from './OrderStatus';
import { orderDelivered, orderStatus } from './orderStatusOptions';
import { UserInfo } from './UserInfo';
import { DrinkList } from './DrinksList';
import { Actions } from './Actions';
import { QRCode as QRCodeType } from './QRCode';
import { useNotifications } from '$contexts/NotificationsContext';

const QRCode = dynamic<React.ComponentProps<typeof QRCodeType>>(
  () => import('./QRCode').then((mod) => mod.QRCode),
  {
    ssr: false,
  },
);

export type Order = Omit<BaseOrder, 'user' | 'drinks'> & {
  user: User & { age: string };
  drinks: Items;
};

export interface ViewOrderTemplateProps {
  isOwner: boolean;
  isStaff: boolean;
  baseOrder: Order;
}

export function ViewOrderTemplate({
  baseOrder,
  isStaff,
  isOwner,
}: ViewOrderTemplateProps) {
  const { notifications } = useNotifications();
  const [order, setOrder] = useState(baseOrder);

  useEffect(() => {
    setOrder(baseOrder);
  }, [baseOrder]);

  const orderStatusOptions = order.delivered
    ? orderDelivered
    : orderStatus[order.status];

  const totalDrinks = Object.keys(order.drinks).length;

  useEffect(() => {
    const notificationFound = notifications.find(
      (notification) => notification.id === baseOrder.uuid,
    );

    if (notificationFound) {
      const status = notificationFound.type;
      const delivered = status === 'DELIVERED';

      setOrder((order) => ({
        ...order,
        delivered,
        status: delivered ? 'FINISHED' : status,
      }));
    }
  }, [notifications, baseOrder]);

  return (
    <DefaultLayout>
      <Flex direction="column" flex="1">
        <Breadcrumbs
          items={[
            { href: '/', label: 'Início' },
            {
              href: isStaff ? '/orders/search' : '/orders/my',
              label: 'Pedidos',
            },
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

          <HStack spacing="4" align="center" justify="end">
            <Box>
              <Icon as={BsClock} mr="2" color="brand.100" />
              {order.createdAt}
            </Box>

            <Box>
              <Icon as={BiDrink} mr="2" color="brand.100" />
              {pluralize(totalDrinks, 'bebida', 'bebidas')}
            </Box>
          </HStack>

          <OrderStatus {...orderStatusOptions} />

          {order.status === 'FINISHED' && !order.delivered && isOwner && (
            <QRCode />
          )}

          <Actions
            isStaff={isStaff}
            isOwner={isOwner}
            order={order}
            setOrder={setOrder}
          />

          <Divider my="8" />

          <Heading mb="8">Usuário</Heading>

          <UserInfo user={order.user} />

          <Divider my="8" />

          <Heading mb="8">Bebidas</Heading>

          <DrinkList drinks={order.drinks} />
        </Flex>
      </Flex>
    </DefaultLayout>
  );
}
