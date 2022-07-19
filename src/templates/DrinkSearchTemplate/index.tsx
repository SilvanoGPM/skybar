import {
  Center,
  Flex,
  Heading,
  Icon,
  SimpleGrid,
  Spinner,
  Text,
  useDisclosure,
} from '@chakra-ui/react';

import { RiSearchLine } from 'react-icons/ri';
import { useState } from 'react';
import { useQuery } from 'react-query';

import { DefaultLayout } from '$components/ui/DefaultLayout';
import { ResponsiveButton } from '$components/ui/ResponsiveButton';
import { useScreenVersion } from '$hooks/useScreenVersion';
import { Pagination } from '$components/Pagination';
import { searchDrink } from '$services/api/drinks';
import { DrinkCard } from '$components/DrinkCard';
import { formatDrinks } from '$utils/formatters';
import { SearchDrawer } from './SearchDrawer';

export function DrinkSearchTemplate() {
  const { isSmallVersion } = useScreenVersion();

  const disclosure = useDisclosure();

  const [page, setPage] = useState(1);

  const { data, isLoading, isError, isFetching } = useQuery(
    ['drinks', page],
    async () => {
      const { content, totalElements } = await searchDrink({
        size: 9,
        page: page - 1,
      });
      return { totalElements, content: formatDrinks(content) };
    },
    {
      staleTime: 1000 * 60 * 10, // 10 minutes
    },
  );

  return (
    <DefaultLayout>
      <Flex
        direction="column"
        flex="1"
        rounded="xl"
        padding={['4', '4', '8']}
        _dark={{ bg: 'gray.800', color: 'gray.50' }}
        _light={{ bg: 'gray.100', color: 'gray.900' }}
      >
        <Flex align="center" justify="space-between" mb="8">
          <Center>
            <Heading as="h3">Bebidas</Heading>
            {isFetching && !isLoading && (
              <Spinner ml="4" color="brand.500" size="md" />
            )}
          </Center>

          <ResponsiveButton
            aria-label="Pesquisar"
            onClick={disclosure.onOpen}
            onlyIcon={!isSmallVersion}
            rightIcon={<Icon as={RiSearchLine} />}
          />
        </Flex>

        {isLoading ? (
          <Center>
            <Spinner color="brand.100" />
          </Center>
        ) : isError ? (
          <Center>
            <Text>Aconteceu um erro ao tentar pesquisar as bebidas</Text>
          </Center>
        ) : (
          <SimpleGrid minChildWidth="250px" spacing={4}>
            {data?.content.map((drink) => (
              <DrinkCard key={drink.uuid} drink={drink} />
            ))}
          </SimpleGrid>
        )}

        <Pagination
          totalCountOfRegisters={data?.totalElements || 0}
          registersPerPage={9}
          currentPage={page}
          onPageChange={setPage}
        />

        <SearchDrawer {...disclosure} />
      </Flex>
    </DefaultLayout>
  );
}
