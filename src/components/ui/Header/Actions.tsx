import { BiBell } from 'react-icons/bi';
import { Box, HStack, Icon, IconButton } from '@chakra-ui/react';

import { useScreenVersion } from '$hooks/useScreenVersion';

import { ToggleThemeButton } from '../ToggleThemeButton';
import { OrderPreviewOpenButton } from '../OrderPreviewOpenButton';
import { useAuth } from '$contexts/AuthContext';
import { useOrders } from '$contexts/OrdersContext';

export function Actions() {
  const { isLargeVersion } = useScreenVersion();
  const { isAuthenticated } = useAuth();
  const { hasOrder } = useOrders();

  return (
    <HStack spacing={['2', '2', '4']} mr={['2', '2', '4']}>
      {isLargeVersion && <ToggleThemeButton />}

      {isAuthenticated && (
        <>
          <IconButton
            aria-label="Notificações"
            colorScheme="gray"
            icon={<Icon as={BiBell} />}
          />

          {hasOrder && <OrderPreviewOpenButton />}
        </>
      )}

      {(isAuthenticated || isLargeVersion) && <Box h="12" w="1px" bg="gray" />}
    </HStack>
  );
}
