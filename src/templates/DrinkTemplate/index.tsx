import { Flex } from '@chakra-ui/react';
import { useRef } from 'react';

import type { Drink as DrinkRaw } from '$services/api/drinks';
import { DefaultLayout } from '$components/ui/DefaultLayout';
import { useOrders } from '$contexts/OrdersContext';
import { TempAnimationHandles } from '$components/animations/TempAnimation';

import { DrinkBreadcrumb } from './DrinkBreadcrumb';
import { DrinkPicture } from './DrinkPicture';
import { DrinkInformation } from './DrinkInformation';

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
    addDrinkToNewOrder(drink);
    animationRef.current?.startAnimation();
  }

  return (
    <DefaultLayout>
      <Flex direction="column" flex="1">
        <DrinkBreadcrumb drinkName={drink.name} />

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
