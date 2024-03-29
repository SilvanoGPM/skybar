import { Icon, IconButton } from '@chakra-ui/react';
import { BiMenu } from 'react-icons/bi';

import { useUIStore } from '$stores/ui';

export function MenuButton() {
  const { openSidebar } = useUIStore();

  return (
    <IconButton
      aria-label="Abrir menu"
      colorScheme="gray"
      onClick={openSidebar}
      icon={<Icon as={BiMenu} />}
    />
  );
}
