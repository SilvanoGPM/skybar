import { Icon, IconButton, LightMode, Tooltip } from '@chakra-ui/react';
import { RiMoneyDollarBoxLine } from 'react-icons/ri';

import { useUIStore } from '$stores/ui';

export function ToggleButton() {
  const { openOrderPreview } = useUIStore(({ openOrderPreview }) => ({
    openOrderPreview,
  }));

  return (
    <LightMode>
      <Tooltip label="Ver pedido atual" placement="left">
        <IconButton
          aria-label="Mostra o pedido atual"
          icon={<Icon as={RiMoneyDollarBoxLine} fontSize="2xl" />}
          size="lg"
          onClick={openOrderPreview}
          pos="fixed"
          right={['5', '10']}
          top="32"
          colorScheme="brand"
          zIndex="dropdown"
        />
      </Tooltip>
    </LightMode>
  );
}
