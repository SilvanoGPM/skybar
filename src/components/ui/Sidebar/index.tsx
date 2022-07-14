import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from '@chakra-ui/react';

import { useScreenVersion } from '$hooks/useScreenVersion';
import { useUIStore } from '$stores/ui';

import { SidebarNav } from './SidebarNav';

export function Sidebar() {
  const { sidebarIsOpen, closeSidebar } = useUIStore(
    ({ sidebarIsOpen, closeSidebar }) => ({ sidebarIsOpen, closeSidebar }),
  );

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
            <DrawerCloseButton mt="6"></DrawerCloseButton>
            <DrawerHeader>Navegação</DrawerHeader>

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
      sx={{
        '&': { scrollbarWidth: 'thin' },
        '&::-webkit-scrollbar ': { width: '9px' },
        '&::-webkit-scrollbar-track': { bg: 'transparent' },
        '&::-webkit-scrollbar-thumb': {
          bg: 'rgba(155, 155, 155, 0.5)',
          border: 'transparent',
        },
      }}
    >
      <SidebarNav />
    </Box>
  );
}
