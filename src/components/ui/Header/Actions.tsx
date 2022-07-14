import { BiBell, BiMoon } from 'react-icons/bi';

import { Box, HStack, Icon, IconButton } from '@chakra-ui/react';

export function Actions() {
  return (
    <HStack spacing={['2', '2', '4']} mr={['2', '2', '4']}>
      <IconButton
        aria-label="Notificações"
        variant="unstyled"
        icon={<Icon as={BiBell} />}
      />
      <IconButton
        aria-label="Mudar tema"
        variant="unstyled"
        icon={<Icon as={BiMoon} />}
      />

      <Box h="12" w="1px" bg="gray.700" />
    </HStack>
  );
}
