import {
  Center,
  Flex,
  Heading,
  HStack,
  Icon,
  Spinner,
  Text,
  useDisclosure,
} from '@chakra-ui/react';

import { useQuery } from 'react-query';
import { useState } from 'react';
import { RiSearchLine } from 'react-icons/ri';

import { Breadcrumbs } from '$components/ui/Breadcrumbs';
import { DefaultLayout } from '$components/ui/DefaultLayout';
import type { Order, OrderSearchParams } from '$services/api/orders';
import { formatOrder } from '$utils/formatters';
import { Pagination } from '$components/ui/Pagination';
import { OrdersList } from '$components/ui/OrdersList';
import { ResponsiveButton } from '$components/ui/ResponsiveButton';
import { useScreenVersion } from '$hooks/useScreenVersion';

import { SearchDrawer, SearchOrdersFormDataFormatted } from './SearchDrawer';
import { FilterOrders } from './FilterOrders';

interface OrderSearchListProps {
  title: string;
  queryOptions: { key: string; staleTime: number; searchUser?: boolean };
  searchOrders: (params: OrderSearchParams) => Promise<Paginated<Order>>;
}

export function OrdersSearchLayout({
  title,
  searchOrders,
  queryOptions,
}: OrderSearchListProps) {
  const { isSmallVersion } = useScreenVersion();

  const disclosure = useDisclosure();

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState({});
  const [order, setOrder] = useState({ order: 'updatedAt', sort: 'desc' });

  const searchParams = {
    size: 9,
    page: page - 1,
    ...search,
    sort: `${order.order},${order.sort}`,
  };

  const { data, isLoading, isFetching, isError } = useQuery(
    [queryOptions.key, searchParams],
    async () => {
      const { content, totalElements } = await searchOrders(searchParams);

      const newContent = content.map(formatOrder);

      return { totalElements, content: newContent };
    },
    {
      staleTime: queryOptions.staleTime,
    },
  );

  function handlePageChange(page: number) {
    window.scroll({ top: 0, behavior: 'smooth' });
    setPage(page);
  }

  function handleSearch(data: SearchOrdersFormDataFormatted) {
    handlePageChange(1);
    setSearch(data);
  }

  return (
    <DefaultLayout>
      <Flex direction="column" flex="1">
        <Breadcrumbs
          items={[
            { href: '/', label: 'Início' },
            { href: '/', label: title },
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
              <Heading>{title}</Heading>

              {isFetching && !isLoading && (
                <Spinner ml="4" color="brand.500" size="md" />
              )}
            </Flex>

            <HStack spacing={2}>
              <FilterOrders onSubmit={setOrder} />

              <ResponsiveButton
                aria-label="Pesquisar"
                onClick={disclosure.onOpen}
                onlyIcon={!isSmallVersion}
                rightIcon={<Icon as={RiSearchLine} />}
              />
            </HStack>
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
              <OrdersList orders={data?.content || []} />

              <Pagination
                totalCountOfRegisters={data?.totalElements || 0}
                registersPerPage={10}
                currentPage={page}
                onPageChange={handlePageChange}
              />

              <SearchDrawer
                {...disclosure}
                onSubmit={handleSearch}
                searchUser={queryOptions?.searchUser}
              />
            </>
          )}
        </Flex>
      </Flex>
    </DefaultLayout>
  );
}
