import { Box, Button, Flex, Heading, Icon, Text } from '@chakra-ui/react';
import { RiShoppingCartLine } from 'react-icons/ri';

interface DrinkInfoProps {
  drink: { name: string; priceFormatted: string };
  showAddButton: boolean;
  onAddDrinkToOrder: () => void;
}

export function DrinkInfo({
  drink,
  showAddButton,
  onAddDrinkToOrder,
}: DrinkInfoProps) {
  return (
    <Flex
      direction="column"
      justify="end"
      pos="absolute"
      w="full"
      h="full"
      bg="blackAlpha.700"
    >
      <Box p="4">
        <Heading as="h3" fontSize="md" mb="2">
          {drink.name}
        </Heading>

        <Text>{drink.priceFormatted}</Text>
      </Box>

      {showAddButton && (
        <Button
          leftIcon={<Icon as={RiShoppingCartLine} />}
          onClick={onAddDrinkToOrder}
          roundedTop="none"
        >
          Adicionar
        </Button>
      )}
    </Flex>
  );
}
