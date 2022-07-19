import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Spacer,
  Text,
} from '@chakra-ui/react';

import { RiShoppingCartLine } from 'react-icons/ri';

import { FadeIn } from '$components/animations/FadeIn';
import { OneLineText } from '$components/ui/OneLineText';
import { thinScrollbar } from '$styles/thinScrollbar';
import { HighlightedText } from '$components/ui/HighlightedText';
import { pluralize } from '$utils/pluralize';
import { useOrders } from '$contexts/OrdersContext';
import { useAuth } from '$contexts/AuthContext';

import { Drink } from '.';

interface DrinkInformationProps {
  drink: Drink;
  onAddDrinkToOrder: () => void;
}

export function DrinkInformation({
  drink,
  onAddDrinkToOrder,
}: DrinkInformationProps) {
  const { isAuthenticated } = useAuth();
  const { items } = useOrders();

  const amount = items[drink.uuid]?.amount || 0;

  return (
    <Flex
      direction="column"
      flex="1"
      maxH={{ base: '100%', lg: '480px' }}
      w="full"
      h="full"
      py="4"
      px={['4', '4', '8']}
      roundedRight="xl"
      roundedLeft={{ base: 'xl', lg: 'none' }}
      _dark={{ bg: 'gray.800', color: 'gray.50' }}
      _light={{ bg: 'gray.100', color: 'gray.900' }}
    >
      <FadeIn x={100} delay={0.5}>
        <Flex
          align="center"
          justify="space-between"
          gap="0.5rem"
          mb="2"
          flex="1"
          flexWrap="wrap"
        >
          <Heading>{drink.name}</Heading>

          <Text
            bg="brand.500"
            p="1"
            textAlign="center"
            maxW="115px"
            w="full"
            rounded="md"
          >
            {drink.volumeFormatted}
          </Text>
        </Flex>
      </FadeIn>

      <FadeIn x={100} delay={0.8}>
        <OneLineText
          fontSize={{ base: 'x-small', md: 'sm' }}
          display="inline-block"
          color="gray.500"
          mb="8"
          maxW={{ base: '250px', md: '100%' }}
        >
          {drink.uuid}
        </OneLineText>
      </FadeIn>

      <FadeIn delay={1}>
        <Box
          maxH="200px"
          maxW="800px"
          overflow="auto"
          fontSize="xl"
          mb="8"
          pb="4"
          sx={thinScrollbar}
        >
          {drink.description}
        </Box>
      </FadeIn>

      <Spacer />

      <FadeIn x={100}>
        <Text fontSize="2xl">
          Por apenas{' '}
          <FadeIn y={-100} delay={0.3} style={{ display: 'inline-block' }}>
            <HighlightedText>{drink.priceFormatted}</HighlightedText>
          </FadeIn>
          .
        </Text>
      </FadeIn>

      {amount > 0 && (
        <Text as="small">
          Você possui{' '}
          <HighlightedText>
            {pluralize(amount, 'bebida', 'bebidas')}
          </HighlightedText>{' '}
          dessa no seu pedido.
        </Text>
      )}

      <FadeIn x={100}>
        <Button
          mt="2"
          w="full"
          disabled={!isAuthenticated}
          leftIcon={<Icon as={RiShoppingCartLine} />}
          onClick={onAddDrinkToOrder}
        >
          Adicionar ao pedido
        </Button>
      </FadeIn>
    </Flex>
  );
}
