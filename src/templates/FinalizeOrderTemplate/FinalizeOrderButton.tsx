import {
  Button,
  HStack,
  LightMode,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  useDisclosure,
} from '@chakra-ui/react';

interface FinalizeOrderButtonProps {
  onFinalizeOrder: () => void;
}

export function FinalizeOrderButton({
  onFinalizeOrder,
}: FinalizeOrderButtonProps) {
  const disclosure = useDisclosure();

  function handleFinalizeOrder() {
    disclosure.onClose();
    onFinalizeOrder();
  }

  return (
    <Popover {...disclosure}>
      <LightMode>
        <PopoverTrigger>
          <Button w="full" color="white" colorScheme="green" size="lg">
            Finalizar pedido
          </Button>
        </PopoverTrigger>
      </LightMode>

      <Portal>
        <PopoverContent>
          <PopoverHeader display="flex" justifyContent="space-between">
            Finalizar pedido
            <PopoverCloseButton pos="static" />
          </PopoverHeader>

          <PopoverBody>
            Você tem certeza que deseja finalizar seu pedido? Ao finalizar você
            não conseguirá alterá-lo.
          </PopoverBody>

          <PopoverFooter>
            <HStack justify="end">
              <Button onClick={disclosure.onClose}>Não</Button>
              <Button onClick={handleFinalizeOrder}>Sim</Button>
            </HStack>
          </PopoverFooter>
        </PopoverContent>
      </Portal>
    </Popover>
  );
}
