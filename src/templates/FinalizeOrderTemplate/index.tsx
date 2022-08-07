import { BiDrink } from 'react-icons/bi';
import Lottie from 'react-lottie';
import { useMutation } from 'react-query';

import {
  Box,
  Center,
  Divider,
  Flex,
  Heading,
  HStack,
  Icon,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';

import { DefaultLayout } from '$components/ui/DefaultLayout';
import { Breadcrumbs } from '$components/ui/Breadcrumbs';
import { LinkButton } from '$components/ui/LinkButton';
import { FinalizeOrderButton } from './FinalizeOrderButton';
import { HighlightedText } from '$components/ui/HighlightedText';
import { useOrders } from '$contexts/OrdersContext';
import animation from '$assets/lottie/sending-order.json';

import { OrderDrinkList } from './OrderDrinkList';
import { createOrder } from '$services/api/orders';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export function FinalizeOrderTemplate() {
  const { total, order, hasOrder, clearOrder } = useOrders();
  const toast = useToast();
  const router = useRouter();

  const orderMutation = useMutation(createOrder, { retry: 3 });

  useEffect(() => {
    if (!hasOrder) {
      router.push('/');
    }
  }, [hasOrder, router]);

  async function handleCreateOrder() {
    try {
      await orderMutation.mutateAsync({ drinks: order.drinks });

      await router.push('/');

      clearOrder();

      toast({
        title: 'Pedido finalizado com sucesso',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch {
      toast({
        title: 'Erro ao finalizar pedido',
        status: 'error',
        duration: 1000,
        isClosable: true,
      });
    }
  }

  if (!hasOrder) {
    return null;
  }

  return (
    <DefaultLayout>
      <Flex direction="column" flex="1">
        <Breadcrumbs
          items={[
            { href: '/', label: 'Início' },
            { href: '/orders', label: 'Pedidos' },
            { href: '#', label: 'Finalizar pedido' },
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
          {orderMutation.isLoading ? (
            <Center flexDirection="column">
              <Text
                color="brand.100"
                textAlign="center"
                fontWeight="bold"
                fontSize={['xl', '2xl', '3xl']}
              >
                Envinado pedido...
              </Text>

              <Box maxW="400px">
                <Lottie
                  isClickToPauseDisabled
                  options={{
                    animationData: animation,
                  }}
                />
              </Box>
            </Center>
          ) : (
            <>
              <Heading
                pb="4"
                mb="8"
                borderBottomWidth="1px"
                borderBottomColor="gray"
              >
                Finalizar pedido
              </Heading>

              <OrderDrinkList />

              <LinkButton
                href="/drinks"
                size="sm"
                variant="outline"
                mt="8"
                leftIcon={<Icon as={BiDrink} />}
              >
                Adicionar bebida
              </LinkButton>

              <Divider my="8" />

              <VStack>
                <HStack justify="space-between" w="full" fontSize="xl">
                  <Text>Total</Text>
                  <HighlightedText>{total.formatted}</HighlightedText>
                </HStack>

                <FinalizeOrderButton onFinalizeOrder={handleCreateOrder} />
              </VStack>
            </>
          )}
        </Flex>
      </Flex>
    </DefaultLayout>
  );
}
