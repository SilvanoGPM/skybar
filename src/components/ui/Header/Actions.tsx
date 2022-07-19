import { BiBell } from 'react-icons/bi';
import { Box, HStack, Icon, IconButton } from '@chakra-ui/react';

import { useScreenVersion } from '$hooks/useScreenVersion';

import { ToggleThemeButton } from '../ToggleThemeButton';
import { OrderPreviewOpenButton } from '../OrderPreviewOpenButton';

export function Actions() {
  const { isLargeVersion } = useScreenVersion();

  return (
    <HStack spacing={['2', '2', '4']} mr={['2', '2', '4']}>
      <IconButton
        aria-label="Notificações"
        colorScheme="gray"
        icon={<Icon as={BiBell} />}
      />

      {isLargeVersion && <ToggleThemeButton />}

      <OrderPreviewOpenButton />

      <Box h="12" w="1px" bg="gray" />
    </HStack>
  );
}
