import { Icon, IconButton, LightMode, Tooltip } from '@chakra-ui/react';
import { RiMoneyDollarBoxLine } from 'react-icons/ri';

import { useUIStore } from '$stores/ui';

export function OpenButton() {
  const { openOrderPreview } = useUIStore(({ openOrderPreview }) => ({
    openOrderPreview,
  }));

  return (
    <LightMode>
      <Tooltip
        label="Ver pedido atual"
        placement="left"
        bg="brand.500"
        color="white"
        hasArrow
      >
        <IconButton
          aria-label="Mostra o pedido atual"
          icon={<Icon as={RiMoneyDollarBoxLine} fontSize="2xl" />}
          size="lg"
          onClick={openOrderPreview}
          pos="fixed"
          right={['5', '10']}
          bottom={['5', '10']}
          colorScheme="brand"
          zIndex="dropdown"
        />
      </Tooltip>
    </LightMode>
  );
}
