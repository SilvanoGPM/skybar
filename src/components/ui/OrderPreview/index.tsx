import { Box, Flex, Icon, IconButton, useBoolean } from '@chakra-ui/react';
import { RiArrowUpLine, RiCheckLine, RiCloseLine } from 'react-icons/ri';

import { useOrders } from '$contexts/OrdersContext';

import { Button } from '../Button';
import { OrdersPopover } from './OrdersPopover';

export function OrderPreview() {
  const { items } = useOrders();

  const [showPreview, { toggle: togglePreview }] = useBoolean(true);

  const hasDrinks = Object.keys(items).length > 0;

  return (
    <Box
      pos="fixed"
      zIndex="docked"
      bottom="0"
      left={[0, 0, 0, '300px']}
      ml={['6', '6', '6', '14']}
      mr="6"
      right="0"
      px="4"
      h={showPreview ? (hasDrinks ? '24' : 0) : '4'}
      overflow={hasDrinks ? 'none' : 'hidden'}
      roundedTop="xl"
      transition="0.2s height"
      borderWidth="1px"
      borderColor="brand.500"
      borderBottomColor="transparent"
      _dark={{ bg: 'gray.700' }}
      _light={{ bg: 'gray.200' }}
    >
      <IconButton
        aria-label="Altenar visibilidade do novo pedido"
        icon={
          <Icon as={showPreview && hasDrinks ? RiCloseLine : RiArrowUpLine} />
        }
        rounded="full"
        alignSelf="start"
        onClick={togglePreview}
        pos="absolute"
        top="-5"
        left="50%"
        borderWidth="1px"
        borderColor="brand.500"
        transform="translateX(-50%)"
        _dark={{ bg: 'gray.700' }}
        _light={{ bg: 'gray.200' }}
      />

      <Flex
        h="24"
        w="full"
        align="center"
        justify="space-between"
        overflow={showPreview && hasDrinks ? 'none' : 'hidden'}
      >
        <OrdersPopover items={items} />

        <Button rightIcon={<Icon as={RiCheckLine} />} colorScheme="green">
          Finalizar pedido
        </Button>
      </Flex>
    </Box>
  );
}
