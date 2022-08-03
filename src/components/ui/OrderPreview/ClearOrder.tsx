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
  LightMode,
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
        <LightMode>
          <IconButton
            onClick={onToggle}
            colorScheme="red"
            color="white"
            aria-label="Limpar pedidos"
            icon={<Icon as={BiTrash} />}
          />
        </LightMode>
      </PopoverTrigger>
      <PopoverContent
        _dark={{ bg: 'gray.900' }}
        _light={{ bg: 'gray.50' }}
        maxW="250px"
      >
        <PopoverHeader fontSize="lg">Limpar pedido?</PopoverHeader>

        <PopoverBody>
          <HStack align="center" justify="end">
            <Button variant="outline" onClick={onClose}>
              Não
            </Button>
            <Button onClick={handleClearOrder}>Sim</Button>
          </HStack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
