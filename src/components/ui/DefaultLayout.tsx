import { ReactNode } from 'react';
import { Flex } from '@chakra-ui/react';

import { Header } from './Header';
import { Sidebar } from './Sidebar';

interface DefaultLayoutProps {
  children: ReactNode;
}

export function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <Flex direction="column" h="100vh">
      <Header />

      <Flex w="100%" my="6" mx="auto" px="6" maxWidth={1480}>
        <Sidebar />

        {children}
      </Flex>
    </Flex>
  );
}
