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
} from '$components/animations/TempAnimation';

import { Button } from '../Button';
import { Drinks } from './Drinks';
import { OpenButton } from './OpenButton';

export function OrderPreview() {
  const { items, clearNewOrder } = useOrders();
  const animationRef = useRef<TempAnimationHandles>(null);
  const [clearingOrder, clearingOrderDrinksActions] = useBoolean(false);

  const { orderPreviewIsOpen, closeOrderPreview } = useUIStore(
    ({ orderPreviewIsOpen, closeOrderPreview }) => ({
      orderPreviewIsOpen,
      closeOrderPreview,
    }),
  );

  const hasDrinks = Object.keys(items).length > 0;

  function handleStartAnimation() {
    clearingOrderDrinksActions.on();
    animationRef.current?.startAnimation();
  }

  function handleAnimationEnd() {
    clearNewOrder();
    clearingOrderDrinksActions.off();
  }

  function handleClose() {
    if (!clearingOrder) {
      closeOrderPreview();
    }
  }

  if (!hasDrinks) {
    return null;
  }

  return (
    <>
      <OpenButton />

      <Drawer isOpen={orderPreviewIsOpen} onClose={handleClose}>
        <DrawerOverlay>
          <DrawerContent _dark={{ bg: 'gray.700' }} _light={{ bg: 'gray.100' }}>
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
                    <Drinks items={items} onClearOrder={handleStartAnimation} />

                    <Spacer />

                    <Button
                      rightIcon={<Icon as={RiCheckLine} />}
                      colorScheme="green"
                    >
                      Finalizar pedido
                    </Button>
                  </>
                )}
              </VStack>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
}
