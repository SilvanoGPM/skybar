import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Icon,
  Spacer,
  useBoolean,
  VStack,
} from '@chakra-ui/react';

import { useRef } from 'react';
import { RiCheckLine } from 'react-icons/ri';

import { useOrders } from '$contexts/OrdersContext';
import { useUIStore } from '$stores/ui';
import animation from '$/assets/lottie/clear-order.json';

import {
  TempAnimation,
  TempAnimationHandles,
} from '$components/animation/TempAnimation';

import { Drinks } from './Drinks';
import { LinkButton } from '../LinkButton';

export function OrderPreview() {
  const { hasOrder, items, total, clearOrder } = useOrders();

  const animationRef = useRef<TempAnimationHandles>(null);
  const [clearingOrder, clearingOrderDrinksActions] = useBoolean(false);

  const { orderPreviewIsOpen, closeOrderPreview } = useUIStore(
    ({ orderPreviewIsOpen, closeOrderPreview }) => ({
      orderPreviewIsOpen,
      closeOrderPreview,
    }),
  );

  function handleStartAnimation() {
    clearingOrderDrinksActions.on();
    animationRef.current?.startAnimation();
  }

  function handleAnimationEnd() {
    clearOrder();
    clearingOrderDrinksActions.off();
  }

  function handleClose() {
    if (!clearingOrder) {
      closeOrderPreview();
    }
  }

  if (!hasOrder) {
    return null;
  }

  return (
    <Drawer isOpen={orderPreviewIsOpen} onClose={handleClose}>
      <DrawerOverlay>
        <DrawerContent _dark={{ bg: 'gray.800' }} _light={{ bg: 'gray.100' }}>
          <DrawerHeader px="4" pb="0" mb="0">
            <Flex align="center" justify="space-between">
              {clearingOrder ? 'Limpando pedido...' : 'Pedido atual'}
              <DrawerCloseButton pos="static" />
            </Flex>
          </DrawerHeader>

          <DrawerBody px="4">
            <VStack spacing={4} pb="4" align="left" h="full">
              <TempAnimation
                ref={animationRef}
                animation={animation}
                onAnimationEnd={handleAnimationEnd}
                speed={2.5}
              />

              {!clearingOrder && (
                <>
                  <Drinks
                    items={items}
                    priceFormatted={total.formatted}
                    onClearOrder={handleStartAnimation}
                  />

                  <Spacer />

                  <LinkButton
                    href="/orders/finalize"
                    rightIcon={<Icon as={RiCheckLine} />}
                    colorScheme="green"
                    color="white"
                  >
                    Finalizar pedido
                  </LinkButton>
                </>
              )}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
}
