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
  useDisclosure,
} from '@chakra-ui/react';

import { BiTrash } from 'react-icons/bi';

import { Button } from '../Button';

interface ClearOrderProps {
  onClearOrder: () => void;
}

export function ClearOrder({ onClearOrder }: ClearOrderProps) {
  const { isOpen, onToggle, onClose } = useDisclosure();

  function handleClearOrder() {
    onClearOrder();
    onClose();
  }

  return (
    <Popover placement="bottom-end" isOpen={isOpen} onClose={onClose}>
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
            <Button onClick={handleClearOrder}>Sim</Button>
          </HStack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
