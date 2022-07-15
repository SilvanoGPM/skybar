import { Box, Image, useBoolean } from '@chakra-ui/react';

import { useAuth } from '$contexts/AuthContext';
import { useOrders } from '$contexts/OrdersContext';

import { AddDrinkAnimation } from '../CartAnimation';
import { AmountBadge } from './AmountBadge';
import { DrinkLink } from './DrinkLink';
import { DrinkInfo } from './DrinkInfo';

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

  const [animationPlaying, animationActions] = useBoolean(false);

  const amount = items[drink.uuid]?.amount || 0;

  function startAnimation() {
    animationActions.on();

    setTimeout(() => {
      animationActions.off();
    }, 3000);
  }

  function handleAddDrinkToOrder() {
    addDrinkToNewOrder(drink);
    startAnimation();
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
      <AmountBadge amount={amount} />

      <Image
        src={drink.picture}
        w="full"
        h="full"
        objectFit="cover"
        pos="absolute"
        zIndex="0"
      />

      <AddDrinkAnimation animationPlaying={animationPlaying} />

      <DrinkInfo
        showAddButton={isAuthenticated}
        drink={drink}
        onAddDrinkToOrder={handleAddDrinkToOrder}
      />

      <DrinkLink fullHeight={!isAuthenticated} drinkUUID={drink.uuid} />
    </Box>
  );
}
