import {
  Box,
  Flex,
  Heading,
  Icon,
  Image,
  Spacer,
  Text,
} from '@chakra-ui/react';

import { useRef } from 'react';
import { RiShoppingCartLine } from 'react-icons/ri';

import { DefaultLayout } from '$components/ui/DefaultLayout';
import { HighlightedText } from '$components/ui/HighlightedText';
import type { Drink as DrinkRaw } from '$services/api/drinks';
import { thinScrollbar } from '$styles/thinScrollbar';
import { Button } from '$components/ui/Button';
import { pluralize } from '$utils/pluralize';
import { useOrders } from '$contexts/OrdersContext';
import { useAuth } from '$contexts/AuthContext';

import {
  AddDrinkAnimation,
  AddDrinkAnimationHandles,
} from '$components/animations/AddDrinkAnimation';

import { DrinkBreadcrumb } from './DrinkBreadcrumb';
import { Badges } from './Badges';

type Drink = { priceFormatted: string } & DrinkRaw;

export interface DrinkTemplateProps {
  drink: Drink;
}

export function DrinkTemplate({ drink }: DrinkTemplateProps) {
  const { isAuthenticated } = useAuth();
  const { addDrinkToNewOrder, items } = useOrders();
  const animationRef = useRef<AddDrinkAnimationHandles>(null);

  const amount = items[drink.uuid]?.amount || 0;

  function handleAddDrinkToOrder() {
    addDrinkToNewOrder(drink);
    animationRef.current?.startAnimation();
  }

  return (
    <DefaultLayout>
      <Flex direction="column" flex="1">
        <DrinkBreadcrumb drinkName={drink.name} />

        <Flex direction={{ base: 'column', lg: 'row' }} flex="1">
          <Box
            maxW={{ base: 'full', lg: '480px' }}
            maxH={{ base: '320px', lg: '480px' }}
            mb={{ base: '4', lg: '0' }}
            flex="1"
            pos="relative"
          >
            <Image
              w="full"
              h="full"
              objectFit="cover"
              src={drink.picture}
              alt={drink.name}
            />

            <Badges drink={drink} />

            <AddDrinkAnimation ref={animationRef} />
          </Box>

          <Flex
            direction="column"
            ml={{ base: 0, lg: '8' }}
            flex="1"
            maxH={{ base: '100%', lg: '480px' }}
            w="full"
            h="full"
          >
            <Heading mb="2">{drink.name}</Heading>

            <Text fontSize="sm" color="gray.500" mb="8">
              {drink.uuid}
            </Text>

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

            <Spacer />

            <Text fontSize="2xl">
              Por apenas{' '}
              <HighlightedText>{drink.priceFormatted}</HighlightedText>.
            </Text>

            {amount > 0 && (
              <Text as="small">
                Você possui{' '}
                <HighlightedText>
                  {pluralize(amount, 'bebida', 'bebidas')}
                </HighlightedText>{' '}
                dessa no seu pedido.
              </Text>
            )}

            <Button
              mt="2"
              disabled={!isAuthenticated}
              leftIcon={<Icon as={RiShoppingCartLine} />}
              onClick={handleAddDrinkToOrder}
            >
              Adicionar ao pedido
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </DefaultLayout>
  );
}
