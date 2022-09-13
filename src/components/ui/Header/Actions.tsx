import { Box, HStack } from '@chakra-ui/react';

import { useScreenVersion } from '$hooks/useScreenVersion';
import { useAuth } from '$contexts/AuthContext';
import { useOrders } from '$contexts/OrdersContext';

import { ToggleThemeButton } from '../ToggleThemeButton';
import { OrderPreviewOpenButton } from '../OrderPreviewOpenButton';
import { NotificationsPopover } from './NotificationsPopover';

export function Actions() {
  const { isLargeVersion } = useScreenVersion();
  const { isAuthenticated } = useAuth();
  const { hasOrder } = useOrders();

  return (
    <HStack spacing={['2', '2', '4']} mr={['2', '2', '4']}>
      {isLargeVersion && <ToggleThemeButton />}

      {isAuthenticated && (
        <>
          <NotificationsPopover />

          {hasOrder && <OrderPreviewOpenButton />}
        </>
      )}

      {(isAuthenticated || isLargeVersion) && <Box h="12" w="1px" bg="gray" />}
    </HStack>
  );
}
