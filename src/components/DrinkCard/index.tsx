import { Box, Image } from '@chakra-ui/react';

import { useAuth } from '$contexts/AuthContext';
import { useOrders } from '$contexts/OrdersContext';
import animation from '$/assets/lottie/add-drink.json';

import {
  TempAnimation,
  TempAnimationHandles,
} from '$components/animations/TempAnimation';

import { AmountBadge } from './AmountBadge';
import { DrinkLink } from './DrinkLink';
import { DrinkInfo } from './DrinkInfo';
import { useRef } from 'react';

interface DrinkCardProps {
  drink: {
    uuid: string;
    name: string;
    picture: string;
    price: number;
    priceFormatted: string;
  };
}

export function DrinkCard({ drink }: DrinkCardProps) {
  const { addDrinkToNewOrder, items } = useOrders();
  const { isAuthenticated } = useAuth();

  const animationRef = useRef<TempAnimationHandles>(null);

  const amount = items[drink.uuid]?.amount || 0;

  function handleAddDrinkToOrder() {
    addDrinkToNewOrder(drink);
    animationRef.current?.startAnimation();
  }

  return (
    <Box
      minW="200px"
      minH="260px"
      rounded="xl"
      overflow="hidden"
      pos="relative"
      color="gray.50"
    >
      {isAuthenticated && <AmountBadge amount={amount} />}

      <Image
        src={drink.picture}
        w="full"
        h="full"
        objectFit="cover"
        pos="absolute"
        zIndex="0"
      />

      <TempAnimation
        animation={animation}
        ref={animationRef}
        containerStyle={{
          pos: 'absolute',
          top: '0',
          left: '0',
          zIndex: 'banner',
          w: 'full',
          h: 'full',
        }}
      />

      <DrinkInfo
        showAddButton={isAuthenticated}
        drink={drink}
        onAddDrinkToOrder={handleAddDrinkToOrder}
      />

      <DrinkLink fullHeight={!isAuthenticated} drinkUUID={drink.uuid} />
    </Box>
  );
}
