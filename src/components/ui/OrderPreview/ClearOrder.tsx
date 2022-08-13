import { Icon, IconButton, UseDisclosureProps } from '@chakra-ui/react';
import { BiTrash } from 'react-icons/bi';

import { ConfirmPopover } from '../ConfirmPopover';

interface ClearOrderProps {
  onClearOrder: () => void;
}

export function ClearOrder({ onClearOrder }: ClearOrderProps) {
  function handleClearOrder(disclosure: UseDisclosureProps) {
    onClearOrder();
    disclosure.onClose?.();
  }

  return (
    <ConfirmPopover
      usePortal={false}
      header="Limpar pedido?"
      onFinish={handleClearOrder}
      popoverProps={{ placement: 'bottom-end' }}
      popoverContentProps={{
        _dark: { bg: 'gray.900' },
        _light: { bg: 'gray.50' },
        maxW: '250px',
      }}
    >
      <IconButton
        colorScheme="red"
        color="white"
        aria-label="Limpar pedidos"
        icon={<Icon as={BiTrash} />}
      />
    </ConfirmPopover>
  );
}
