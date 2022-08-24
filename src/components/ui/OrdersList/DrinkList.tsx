import { Badge, Box, Center, HStack, Image } from '@chakra-ui/react';
import ScrollContainer from 'react-indiana-drag-scroll';

import type { Items } from '$contexts/OrdersContext';

interface DrinkListProps {
  drinks: Items;
}

export function DrinkList({ drinks }: DrinkListProps) {
  return (
    <HStack
      spacing="4"
      py="4"
      overflow="hidden"
      maxW={['230px', '350px', '500px']}
      as={ScrollContainer}
    >
      {Object.values(drinks).map((drink) => (
        <Box key={drink.uuid} minW="80px" maxW="80px" h="80px" pos="relative">
          <Image src={drink.picture} w="full" h="full" rounded="md" />

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
  );
}
