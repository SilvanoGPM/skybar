import { useMemo } from 'react';

import { VStack, Flex, Text } from '@chakra-ui/react';

import type { Items } from '$contexts/OrdersContext';
import { pluralize } from '$utils/pluralize';
import { formatAmount } from '$utils/formatters';

import { DrinkItem } from './DrinkItem';
import { ClearOrder } from './ClearOrder';
import { HighlightedText } from '../HighlightedText';

interface OrdersPopoverProps {
  items: Items;
  onClearOrder: () => void;
}

export function Drinks({ items, onClearOrder }: OrdersPopoverProps) {
  const price = useMemo(() => {
    const price = Object.values(items).reduce(
      (total, { price, amount }) => total + price * amount,
      0,
    );

    return formatAmount(price);
  }, [items]);

  return (
    <Flex
      _dark={{ bg: 'gray.900' }}
      _light={{ bg: 'gray.50' }}
      direction="column"
      p="4"
      rounded="md"
      transition="0.2s"
    >
      <Flex
        align="center"
        justify="space-between"
        mb="4"
        fontSize="xl"
        fontWeight="bold"
      >
        {pluralize(Object.keys(items).length, 'Bebida', 'Bebidas')}
        <ClearOrder onClearOrder={onClearOrder} />
      </Flex>

      <VStack align="start" spacing={4} maxH="320px" overflow="auto">
        {Object.values(items).map((drink) => (
          <DrinkItem key={drink.uuid} drink={drink} />
        ))}
      </VStack>

      <Text mt="4">
        Preço: <HighlightedText>{price}</HighlightedText>
      </Text>
    </Flex>
  );
}
