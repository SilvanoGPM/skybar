import { BiBell } from 'react-icons/bi';
import { Box, HStack, Icon, IconButton } from '@chakra-ui/react';

import { ToggleThemeButton } from '../ToggleThemeButton';
import { useScreenVersion } from '$hooks/useScreenVersion';

export function Actions() {
  const { isLargeVersion } = useScreenVersion();

  return (
    <HStack spacing={['2', '2', '4']} mr={['2', '2', '4']}>
      <IconButton
        aria-label="Notificações"
        variant="unstyled"
        icon={<Icon as={BiBell} />}
      />

      {isLargeVersion && <ToggleThemeButton />}

      <Box h="12" w="1px" bg="gray.800" />
    </HStack>
  );
}
