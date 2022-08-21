import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  HStack,
} from '@chakra-ui/react';

import { useScreenVersion } from '$hooks/useScreenVersion';
import { useUIStore } from '$stores/ui';
import { thinScrollbar } from '$styles/thinScrollbar';

import { SidebarNav } from './SidebarNav';
import { ToggleThemeButton } from '../ToggleThemeButton';

export function Sidebar() {
  const { sidebarIsOpen, closeSidebar } = useUIStore();

  const { isLargeVersion } = useScreenVersion();

  if (!isLargeVersion) {
    return (
      <Drawer isOpen={sidebarIsOpen} placement="left" onClose={closeSidebar}>
        <DrawerOverlay>
          <DrawerContent
            p="4"
            _dark={{ bg: 'gray.800' }}
            _light={{ bg: 'gray.100' }}
          >
            <DrawerHeader>
              <Flex align="center" justify="space-between">
                Navegação
                <HStack spacing={2}>
                  <ToggleThemeButton />
                  <DrawerCloseButton pos="static" />
                </HStack>
              </Flex>
            </DrawerHeader>

            <DrawerBody>
              <SidebarNav />
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    );
  }

  return (
    <Box
      as="aside"
      minW="300px"
      maxH="80vh"
      mr="8"
      overflowY="auto"
      pos="sticky"
      top="50px"
      sx={thinScrollbar}
      data-testid="sidebar"
    >
      <SidebarNav />
    </Box>
  );
}
