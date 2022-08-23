import {
  Avatar,
  Badge,
  Box,
  Center,
  Circle,
  Flex,
  Heading,
  HStack,
  Icon,
  Image,
  Spinner,
  Text,
  Tooltip,
  VStack,
} from '@chakra-ui/react';

import { AiFillClockCircle } from 'react-icons/ai';
import { useQuery } from 'react-query';
import ScrollContainer from 'react-indiana-drag-scroll';
import { useState } from 'react';
import { RiPlayCircleFill } from 'react-icons/ri';
import { BiCart } from 'react-icons/bi';

import { Breadcrumbs } from '$components/ui/Breadcrumbs';
import { DefaultLayout } from '$components/ui/DefaultLayout';
import { getOrdersToManage } from '$services/api/orders';
import { formatOrder } from '$utils/formatters';
import { HighlightedText } from '$components/ui/HighlightedText';
import { LinkButton } from '$components/ui/LinkButton';
import { Empty } from '$components/ui/Empty';
import { Pagination } from '$components/ui/Pagination';

import { FilterOrder, FilterStatus } from './FilterOrders';

const badges = {
  PROCESSING: {
    title: 'Esperando confirmação',
    bgColor: 'blue.400',
    children: <Spinner size="sm" color="white" />,
  },

  STARTED: {
    title: 'Pedido iniciado',
    bgColor: 'green.400',
    children: <Icon as={RiPlayCircleFill} color="white" />,
  },
};

type BadgeKey = keyof typeof badges;

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

      console.log(content, newContent);

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

  console.log(filter);

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
              {data?.totalElements ? (
                <VStack spacing="8">
                  {data?.content
                    .filter(
                      ({ status }) => filter === 'ALL' || status === filter,
                    )
                    .map((item) => {
                      const badge = badges[item.status as BadgeKey];

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
                            bgGradient={
                              'linear(to top right, brand.900, brand.100)'
                            }
                            color="white"
                          >
                            <Icon as={BiCart} fontSize="6xl" />
                          </Center>

                          <Flex
                            w="full"
                            direction="column"
                            p="4"
                            pl={['4', '4', '8']}
                          >
                            <Flex
                              align="center"
                              justify="space-between"
                              w="full"
                              h="20px"
                              mb="4"
                            >
                              <HStack>
                                <Avatar
                                  src={item.user.image}
                                  name={item.user.name}
                                  title={item.user.name}
                                  size="sm"
                                />

                                <Tooltip
                                  label={badge.title}
                                  bg={badge.bgColor}
                                  color="white"
                                >
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

                            <HStack
                              spacing="4"
                              py="4"
                              overflow="hidden"
                              maxW={['230px', '350px', '500px']}
                              as={ScrollContainer}
                            >
                              {Object.values(item.drinks).map((drink) => (
                                <Box
                                  key={drink.uuid}
                                  minW="80px"
                                  maxW="80px"
                                  h="80px"
                                  pos="relative"
                                >
                                  <Image
                                    src={drink.picture}
                                    w="full"
                                    h="full"
                                    rounded="md"
                                  />

                                  <Badge
                                    bg="brand.100"
                                    color="white"
                                    w="6"
                                    h="6"
                                    rounded="full"
                                    pos="absolute"
                                    top="-4"
                                    right="-4"
                                  >
                                    <Center h="full">{drink.amount}</Center>
                                  </Badge>
                                </Box>
                              ))}
                            </HStack>

                            <Flex
                              align="center"
                              justify="space-between"
                              direction={['column', 'row']}
                            >
                              <HighlightedText>
                                {item.total.formatted}
                              </HighlightedText>

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
              )}

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
