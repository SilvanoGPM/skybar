import { Center, Flex, Heading, Spinner, Text } from '@chakra-ui/react';
import { useQuery } from 'react-query';
import { useState } from 'react';

import { Breadcrumbs } from '$components/ui/Breadcrumbs';
import { DefaultLayout } from '$components/ui/DefaultLayout';
import { getOrdersToManage } from '$services/api/orders';
import { formatOrder } from '$utils/formatters';
import { Pagination } from '$components/ui/Pagination';
import { OrdersList } from '$components/ui/OrdersList';

import { FilterOrder, FilterStatus } from './FilterOrders';

export function LatestOrdersTemplate() {
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState<FilterStatus>('ALL');

  const { data, isLoading, isFetching, isError } = useQuery(
    ['ordersToManage', page],
    async () => {
      const { content, totalElements } = await getOrdersToManage(page - 1);

      const newContent = content
        .sort(
          (a, b) =>
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
        )
        .map(formatOrder);

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
              <OrdersList
                orders={
                  data?.content.filter(
                    ({ status }) => filter === 'ALL' || status === filter,
                  ) || []
                }
              />

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
