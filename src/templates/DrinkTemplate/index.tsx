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

import type { Drink as DrinkRaw } from '$services/api/drinks';
import { DefaultLayout } from '$components/ui/DefaultLayout';
import { HighlightedText } from '$components/ui/HighlightedText';
import { thinScrollbar } from '$styles/thinScrollbar';
import { Button } from '$components/ui/Button';
import { pluralize } from '$utils/pluralize';
import { useOrders } from '$contexts/OrdersContext';
import { useAuth } from '$contexts/AuthContext';
import animation from '$/assets/lottie/add-drink.json';
import { FadeIn } from '$components/animations/FadeIn';

import {
  TempAnimation,
  TempAnimationHandles,
} from '$components/animations/TempAnimation';

import { DrinkBreadcrumb } from './DrinkBreadcrumb';
import { Badges } from './Badges';

type Drink = { priceFormatted: string } & DrinkRaw;

export interface DrinkTemplateProps {
  drink: Drink;
}

export function DrinkTemplate({ drink }: DrinkTemplateProps) {
  const { isAuthenticated } = useAuth();
  const { addDrinkToNewOrder, items } = useOrders();
  const animationRef = useRef<TempAnimationHandles>(null);

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
          <FadeIn x={-100} style={{ flex: 1, display: 'flex' }}>
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

              <TempAnimation
                animation={animation}
                ref={animationRef}
                speed={2}
                containerStyle={{
                  pos: 'absolute',
                  top: '0',
                  left: '0',
                  zIndex: 'banner',
                  w: 'full',
                  h: 'full',
                }}
              />
            </Box>
          </FadeIn>

          <Flex
            direction="column"
            ml={{ base: 0, lg: '8' }}
            flex="1"
            maxH={{ base: '100%', lg: '480px' }}
            w="full"
            h="full"
          >
            <FadeIn x={100} delay={0.5}>
              <Heading mb="2">{drink.name}</Heading>
            </FadeIn>

            <FadeIn x={100} delay={0.8}>
              <Text fontSize="sm" color="gray.500" mb="8">
                {drink.uuid}
              </Text>
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
                <FadeIn
                  y={-100}
                  delay={0.3}
                  style={{ display: 'inline-block' }}
                >
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
                onClick={handleAddDrinkToOrder}
              >
                Adicionar ao pedido
              </Button>
            </FadeIn>
          </Flex>
        </Flex>
      </Flex>
    </DefaultLayout>
  );
}
