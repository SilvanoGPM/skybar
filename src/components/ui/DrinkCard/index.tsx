import { Box, HStack, Image } from '@chakra-ui/react';
import { useRef } from 'react';

import { useAuth } from '$contexts/AuthContext';
import { useOrders } from '$contexts/OrdersContext';
import animation from '$/assets/lottie/add-drink.json';
import { getUserPermissions } from '$utils/getUserPermissions';

import {
  TempAnimation,
  TempAnimationHandles,
} from '$components/animation/TempAnimation';

import { AmountBadge } from './AmountBadge';
import { DrinkLink } from './DrinkLink';
import { DrinkInfo } from './DrinkInfo';
import { EditBadge } from './EditBadge';
import { DeleteBadge } from './DeleteBadge';

interface DrinkCardProps {
  drink: {
    uuid: string;
    name: string;
    picture: string;
    price: number;
    priceFormatted: string;
    alcoholic: boolean;
  };
  showAdminActions?: boolean;
  isDeleting?: boolean;
  onDeleteDrink?: (uuid: string) => void;
}

export function DrinkCard({
  drink,
  onDeleteDrink,
  showAdminActions = false,
  isDeleting = false,
}: DrinkCardProps) {
  const { addDrink, items } = useOrders();
  const { isAuthenticated, user } = useAuth();

  const animationRef = useRef<TempAnimationHandles>(null);

  const amount = items?.[drink.uuid]?.amount || 0;

  const { isStaff, isUser } = getUserPermissions(user?.role);

  function handleAddDrinkToOrder() {
    const isOk = addDrink(drink);

    if (isOk) {
      animationRef.current?.startAnimation();
    }
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
      {isAuthenticated && (
        <HStack pos="absolute" zIndex="2" right="2" top="2" spacing={2}>
          {showAdminActions && isStaff && (
            <>
              <DeleteBadge
                {...drink}
                onDelete={onDeleteDrink}
                isDeleting={isDeleting}
              />

              <EditBadge uuid={drink.uuid} />
            </>
          )}

          {isUser && <AmountBadge amount={amount} />}
        </HStack>
      )}

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
        showAddButton={isUser}
        drink={drink}
        onAddDrinkToOrder={handleAddDrinkToOrder}
      />

      <DrinkLink fullHeight={!isUser} drinkUUID={drink.uuid} />
    </Box>
  );
}
