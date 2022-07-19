import { Flex } from '@chakra-ui/react';
import { useRef } from 'react';

import type { Drink as DrinkRaw } from '$services/api/drinks';
import { DefaultLayout } from '$components/ui/DefaultLayout';
import { useOrders } from '$contexts/OrdersContext';
import { TempAnimationHandles } from '$components/animation/TempAnimation';

import { DrinkPicture } from './DrinkPicture';
import { DrinkInformation } from './DrinkInformation';
import { Breadcrumbs } from '$components/ui/Breadcrumbs';

export type Drink = {
  priceFormatted: string;
  volumeFormatted: string;
} & DrinkRaw;

export interface DrinkTemplateProps {
  drink: Drink;
}

export function DrinkTemplate({ drink }: DrinkTemplateProps) {
  const { addDrinkToNewOrder } = useOrders();
  const animationRef = useRef<TempAnimationHandles>(null);

  function handleAddDrinkToOrder() {
    const isOk = addDrinkToNewOrder(drink);

    if (isOk) {
      animationRef.current?.startAnimation();
    }
  }

  return (
    <DefaultLayout>
      <Flex direction="column" flex="1">
        <Breadcrumbs
          mb="8"
          spacing="8px"
          items={[
            { href: '/', label: 'Início' },
            { href: '/drinks', label: 'Bebidas' },
            { href: '#', label: drink.name },
          ]}
        />

        <Flex direction={{ base: 'column', lg: 'row' }} flex="1">
          <DrinkPicture drink={drink} animationRef={animationRef} />

          <DrinkInformation
            drink={drink}
            onAddDrinkToOrder={handleAddDrinkToOrder}
          />
        </Flex>
      </Flex>
    </DefaultLayout>
  );
}
