import { Icon, IconButton, LightMode, Tooltip } from '@chakra-ui/react';
import { RiMoneyDollarBoxLine } from 'react-icons/ri';

import { useUIStore } from '$stores/ui';

export function OrderPreviewOpenButton() {
  const { openOrderPreview } = useUIStore(({ openOrderPreview }) => ({
    openOrderPreview,
  }));

  return (
    <LightMode>
      <Tooltip
        label="Ver pedido atual"
        placement="bottom"
        bg="green.500"
        color="white"
        hasArrow
      >
        <IconButton
          aria-label="Mostra o pedido atual"
          icon={<Icon as={RiMoneyDollarBoxLine} fontSize="2xl" />}
          onClick={openOrderPreview}
          colorScheme="green"
          color="white"
        />
      </Tooltip>
    </LightMode>
  );
}
