import { Box, Divider, Flex, Heading, HStack, Icon } from '@chakra-ui/react';
import { BsClock } from 'react-icons/bs';
import { BiDrink } from 'react-icons/bi';

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

type Order = Omit<BaseOrder, 'user' | 'drinks'> & {
  user: User & { age: string };
  drinks: Items;
};

export interface ViewOrderTemplateProps {
  isOwner: boolean;
  isStaff: boolean;
  order: Order;
}

export function ViewOrderTemplate({ order, isStaff }: ViewOrderTemplateProps) {
  const orderStatusOptions = order.delivered
    ? orderDelivered
    : orderStatus[order.status];

  const totalDrinks = Object.keys(order.drinks).length;

  return (
    <DefaultLayout>
      <Flex direction="column" flex="1">
        <Breadcrumbs
          items={[
            { href: '/', label: 'Início' },
            { href: isStaff ? '/orders/search' : '/orders', label: 'Pedidos' },
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
