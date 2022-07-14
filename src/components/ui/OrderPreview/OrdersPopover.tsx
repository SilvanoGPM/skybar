import { BiDrink } from 'react-icons/bi';
import { useMemo } from 'react';

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  Icon,
  VStack,
} from '@chakra-ui/react';

import type { Items } from '$contexts/OrdersContext';
import { useScreenVersion } from '$hooks/useScreenVersion';
import { pluralize } from '$utils/pluralize';
import { formatAmount } from '$utils/formatters';

import { ResponsiveButton } from '../ResponsiveButton';
import { DrinkItem } from './DrinkItem';

interface OrdersPopoverProps {
  items: Items;
}

export function OrdersPopover({ items }: OrdersPopoverProps) {
  const { isLargeVersion } = useScreenVersion();

  const price = useMemo(() => {
    const price = Object.values(items).reduce(
      (total, { price, amount }) => total + price * amount,
      0,
    );

    return formatAmount(price);
  }, [items]);

  return (
    <Popover placement="top-start">
      <PopoverTrigger>
        <ResponsiveButton
          aria-label="Bebidas"
          onlyIcon={!isLargeVersion}
          leftIcon={<Icon as={BiDrink} />}
        />
      </PopoverTrigger>
      <PopoverContent
        _dark={{ bg: 'gray.900' }}
        _light={{ bg: 'gray.50' }}
        maxW="250px"
      >
        <PopoverHeader fontSize="lg">
          {pluralize(Object.keys(items).length, 'Bebida', 'Bebidas')}
        </PopoverHeader>

        <PopoverBody>
          <VStack align="start" spacing={4} maxH="200px" overflow="auto">
            {Object.values(items).map((drink) => (
              <DrinkItem key={drink.uuid} drink={drink} />
            ))}
          </VStack>
        </PopoverBody>

        <PopoverFooter>Preço: {price}</PopoverFooter>
      </PopoverContent>
    </Popover>
  );
}
