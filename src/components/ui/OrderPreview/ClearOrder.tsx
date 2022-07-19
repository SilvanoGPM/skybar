import {
  Icon,
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  HStack,
  useDisclosure,
  Button,
} from '@chakra-ui/react';

import { BiTrash } from 'react-icons/bi';

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
            <Button onClick={onClose}>Não</Button>
            <Button onClick={handleClearOrder}>Sim</Button>
          </HStack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
