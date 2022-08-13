import { Button, UseDisclosureProps } from '@chakra-ui/react';

import { ConfirmPopover } from '$components/ui/ConfirmPopover';

interface FinalizeOrderButtonProps {
  onFinalizeOrder: () => void;
}

export function FinalizeOrderButton({
  onFinalizeOrder,
}: FinalizeOrderButtonProps) {
  function handleFinalizeOrder(disclosure: UseDisclosureProps) {
    disclosure.onClose?.();
    onFinalizeOrder();
  }

  return (
    <ConfirmPopover
      header="Finalizar pedido"
      body="Você tem certeza que deseja finalizar seu pedido? Ao finalizar você
  não conseguirá alterá-lo."
      onFinish={handleFinalizeOrder}
    >
      <Button w="full" color="white" colorScheme="green" size="lg">
        Finalizar pedido
      </Button>
    </ConfirmPopover>
  );
}
