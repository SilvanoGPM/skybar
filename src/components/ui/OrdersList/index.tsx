import {
  Avatar,
  Center,
  Circle,
  Flex,
  HStack,
  Icon,
  Text,
  Tooltip,
  VStack,
} from '@chakra-ui/react';

import { AiFillClockCircle } from 'react-icons/ai';
import { BiCart } from 'react-icons/bi';

import type { FormattedOrder } from '$utils/formatters';

import { Empty } from '../Empty';
import { HighlightedText } from '../HighlightedText';
import { LinkButton } from '../LinkButton';
import { BadgeKey, badges } from './badges';
import { DrinkList } from './DrinkList';

interface OrdersListProps {
  orders: FormattedOrder[];
}

export function OrdersList({ orders }: OrdersListProps) {
  return orders.length ? (
    <VStack spacing="8">
      {orders.map((item) => {
        const badge = item.delivered
          ? badges.DELIVERED
          : badges[item.status as BadgeKey];

        return (
          <Flex
            key={item.uuid}
            w="full"
            rounded="md"
            borderRight="8px"
            borderRightColor="brand.500"
            overflow="hidden"
            _dark={{ bg: 'gray.900' }}
            _light={{ bg: 'gray.50' }}
          >
            <Center
              display={['none', 'none', 'flex']}
              w="150px"
              bgGradient={'linear(to top right, brand.900, brand.100)'}
              color="white"
            >
              <Icon as={BiCart} fontSize="6xl" />
            </Center>

            <Flex w="full" direction="column" p="4" pl={['4', '4', '8']}>
              <Flex
                align="center"
                justify="space-between"
                w="full"
                h="20px"
                mb="4"
              >
                <HStack>
                  <Tooltip label={item.user.name}>
                    <Avatar
                      src={item.user.image}
                      name={item.user.name}
                      size="sm"
                    />
                  </Tooltip>

                  <Tooltip label={badge.title} bg={badge.bgColor} color="white">
                    <Circle bg={badge.bgColor} p="2">
                      {badge.children}
                    </Circle>
                  </Tooltip>
                </HStack>

                <Tooltip label="Última atualização">
                  <HStack>
                    <Icon as={AiFillClockCircle} />
                    <Text>{item.updatedAt}</Text>
                  </HStack>
                </Tooltip>
              </Flex>

              <DrinkList drinks={item.drinks} />

              <Flex
                align="center"
                justify="space-between"
                direction={['column', 'row']}
              >
                <HighlightedText>{item.total.formatted}</HighlightedText>

                <LinkButton
                  href={`/orders/${item.uuid}`}
                  maxW={['full', '200px']}
                >
                  Ver pedido
                </LinkButton>
              </Flex>
            </Flex>
          </Flex>
        );
      })}
    </VStack>
  ) : (
    <Empty
      title="Nenhum pedido"
      message="Pode relaxar, sem pedidos no momento."
    />
  );
}
