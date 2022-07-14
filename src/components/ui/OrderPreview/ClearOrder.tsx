import {
  Icon,
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  HStack,
  Button as ChakraButton,
  useBreakpointValue,
  PlacementWithLogical,
  useDisclosure,
} from '@chakra-ui/react';

import { BiTrash } from 'react-icons/bi';

import { useOrders } from '$contexts/OrdersContext';

import { Button } from '../Button';

export function ClearOrder() {
  const { isOpen, onToggle, onClose } = useDisclosure();
  const { clearNewOrder } = useOrders();

  const popoverPlacement = useBreakpointValue<PlacementWithLogical>({
    base: 'top-end',
    lg: 'right-end',
  });

  return (
    <Popover placement={popoverPlacement} isOpen={isOpen} onClose={onClose}>
      <PopoverTrigger>
        <IconButton
          onClick={onToggle}
          colorScheme="red"
          aria-label="Limpar pedidos"
          icon={<Icon as={BiTrash} />}
        />
      </PopoverTrigger>
      <PopoverContent
        _dark={{ bg: 'gray.900' }}
        _light={{ bg: 'gray.50' }}
        maxW="250px"
      >
        <PopoverHeader fontSize="lg">Limpar pedido?</PopoverHeader>

        <PopoverBody>
          <HStack align="center" justify="end">
            <ChakraButton onClick={onClose}>Não</ChakraButton>
            <Button onClick={clearNewOrder}>Sim</Button>
          </HStack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
