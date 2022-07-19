import { FormEvent, ReactNode } from 'react';

import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Icon,
  StackProps,
  VStack,
} from '@chakra-ui/react';
import { RiSearchLine } from 'react-icons/ri';
import { BiTrashAlt } from 'react-icons/bi';

interface FormDrawerProps extends Pick<StackProps, 'spacing'> {
  children: ReactNode;
  isOpen: boolean;
  title?: string;
  onClose: () => void;
  onReset?: () => void;
  onSubmit?: (event?: FormEvent) => void;
}

export function FormDrawer({
  isOpen,
  onClose,
  children,
  onSubmit,
  onReset,
  title,
  spacing = '4',
}: FormDrawerProps) {
  function handleReset() {
    onReset?.();
    onSubmit?.();
  }

  return (
    <Drawer isOpen={isOpen} onClose={onClose} size="sm">
      <DrawerOverlay>
        <DrawerContent _dark={{ bg: 'gray.900' }} _light={{ bg: 'gray.50' }}>
          {title && (
            <DrawerHeader p="4">
              <Flex align="center" justify="space-between">
                {title}
                <DrawerCloseButton pos="static" />
              </Flex>
            </DrawerHeader>
          )}

          <DrawerBody p="4">
            <Box
              onSubmit={onSubmit}
              as="form"
              p="4"
              rounded="xl"
              _dark={{ bg: 'gray.800' }}
              _light={{ bg: 'gray.100' }}
            >
              <VStack spacing={spacing}>
                {children}
                <Button
                  type="submit"
                  rightIcon={<Icon as={RiSearchLine} />}
                  w="full"
                >
                  Pesquisar
                </Button>

                <Button
                  onClick={handleReset}
                  variant="outline"
                  rightIcon={<Icon as={BiTrashAlt} />}
                  w="full"
                >
                  Limpar
                </Button>
              </VStack>
            </Box>
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
}
