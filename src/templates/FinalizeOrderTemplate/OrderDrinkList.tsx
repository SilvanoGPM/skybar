import { Box, Flex, Text, VStack } from '@chakra-ui/react';

import { Link } from '$components/ui/Link';
import { OneLineText } from '$components/ui/OneLineText';
import { useOrders } from '$contexts/OrdersContext';
import { HighlightedText } from '$components/ui/HighlightedText';
import { AmountStepper } from './AmountStepper';

export function OrderDrinkList() {
  const { items, addDrinkToNewOrder, removeDrink } = useOrders();

  return (
    <VStack spacing="8">
      {Object.values(items).map((drink) => (
        <Flex key={drink.uuid} w="full" minH="40" direction={['column', 'row']}>
          <Box
            flex="1"
            maxW={['full', '40']}
            bgSize="cover"
            bgPos="center"
            bgImg={drink.picture}
            minH={['40', 'full']}
            roundedTopLeft="xl"
            roundedBottomLeft={['none', 'xl']}
            roundedTopRight={['xl', 'none']}
            _light={{ bgColor: 'gray.50' }}
            _dark={{ bgColor: 'gray.900' }}
          />

          <Flex
            direction="column"
            justify="space-between"
            p="4"
            flex="1"
            w="full"
            roundedBottomRight="xl"
            roundedTopRight={['none', 'xl']}
            roundedBottomLeft={['xl', 'none']}
            _light={{ bg: 'gray.50' }}
            _dark={{ bg: 'gray.900' }}
          >
            <Link href={`/drinks/${drink.uuid}`} width="fit-content">
              <OneLineText
                display="inline-block"
                maxW={{ base: '130px', sm: '250px', md: '500px' }}
                fontWeight="semibold"
                _light={{ color: 'gray.800' }}
                _dark={{ color: 'gray.50' }}
                fontSize={['md', 'xl', '2xl']}
              >
                {drink.name}
              </OneLineText>
            </Link>

            <Flex align="center" justify="space-between">
              <HighlightedText fontSize="xl" mr="4">
                {drink.totalFormatted}
              </HighlightedText>

              <Text>
                <HighlightedText>{drink.amount}x</HighlightedText>{' '}
                {drink.priceFormatted}
              </Text>
            </Flex>

            <AmountStepper
              value={drink.amount}
              removeOptions={{
                title: 'Remover bebida',
                body: 'Tem certeza que deseja remover esta bebida do seu pedido?',
              }}
              onIncrement={() => addDrinkToNewOrder(drink)}
              onDecrement={() => removeDrink(drink.uuid)}
            />
          </Flex>
        </Flex>
      ))}
    </VStack>
  );
}
