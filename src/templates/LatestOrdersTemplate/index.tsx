import {
  Alert,
  AlertIcon,
  AlertTitle,
  Box,
  Center,
  CloseButton,
  Flex,
  Heading,
  Spinner,
  Text,
  useBoolean,
} from '@chakra-ui/react';

import { useQuery } from 'react-query';
import { useEffect, useRef, useState } from 'react';

import { Breadcrumbs } from '$components/ui/Breadcrumbs';
import { DefaultLayout } from '$components/ui/DefaultLayout';
import { getOrdersToManage } from '$services/api/orders';
import { formatOrder } from '$utils/formatters';
import { Pagination } from '$components/ui/Pagination';
import { OrdersList } from '$components/ui/OrdersList';

import { FilterOrder, FilterStatus } from './FilterOrders';
import { useNotifications } from '$contexts/NotificationsContext';
import { queryClient } from '$services/queryClient';

export function LatestOrdersTemplate() {
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState<FilterStatus>('PROCESSING');

  const lastTitleRef = useRef('');

  const [showNewOrderAlert, setShowNewOrderAlert] = useBoolean(false);

  const { newOrderReceived, visualizateNewOrderReceived } = useNotifications();

  useEffect(() => {
    function returnDocumentTitle() {
      if (lastTitleRef.current) {
        document.title = lastTitleRef.current;
      }
    }

    window.addEventListener('focus', returnDocumentTitle);

    return () => {
      window.removeEventListener('focus', returnDocumentTitle);
    };
  }, []);

  useEffect(() => {
    if (newOrderReceived) {
      if (!document.hasFocus()) {
        lastTitleRef.current = document.title;
        document.title = 'Novos pedidos chegaram!';
      }

      setPage(1);
      setFilter('PROCESSING');

      queryClient.invalidateQueries('ordersToManage');

      setShowNewOrderAlert.on();
      visualizateNewOrderReceived();
    }
  }, [newOrderReceived, visualizateNewOrderReceived, setShowNewOrderAlert]);

  const params = {
    page: page - 1,
    size: 10,
    status: filter,
  };

  const { data, isLoading, isFetching, isError } = useQuery(
    ['ordersToManage', params],
    async () => {
      const { content, totalElements } = await getOrdersToManage(params);

      const newContent = content.map(formatOrder);

      return { totalElements, content: newContent };
    },
    {
      staleTime: 30 * 1000, // 30 seconds
    },
  );

  function handlePageChange(page: number) {
    window.scroll({ top: 0, behavior: 'smooth' });
    setPage(page);
  }

  return (
    <DefaultLayout>
      <Flex direction="column" flex="1">
        <Breadcrumbs
          items={[
            { href: '/', label: 'Início' },
            { href: '/', label: 'Últimos pedidos' },
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
          <Flex align="center" justify="space-between" mb="8">
            <Flex align="center">
              <Heading>Últimos Pedidos</Heading>

              {isFetching && !isLoading && (
                <Spinner ml="4" color="brand.500" size="md" />
              )}
            </Flex>

            <FilterOrder onSubmit={setFilter} />
          </Flex>

          {isLoading ? (
            <Center>
              <Spinner color="brand.100" />
            </Center>
          ) : isError ? (
            <Center>
              <Text>Aconteceu um erro ao tentar pesquisar os pedidos</Text>
            </Center>
          ) : (
            <>
              {showNewOrderAlert && (
                <Alert status="info" pos="relative" p={['8', '8', '4']} mb="4">
                  <AlertIcon />

                  <Box>
                    <AlertTitle>Novos pedidos foram encontrados</AlertTitle>
                  </Box>

                  <CloseButton
                    alignSelf="flex-start"
                    position="absolute"
                    right={['1', '1', '2']}
                    top={['1', '1', '2']}
                    onClick={setShowNewOrderAlert.off}
                  />
                </Alert>
              )}

              <OrdersList orders={data?.content || []} status={filter} />

              <Pagination
                showResume={false}
                totalCountOfRegisters={data?.totalElements || 0}
                registersPerPage={10}
                currentPage={page}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </Flex>
      </Flex>
    </DefaultLayout>
  );
}
