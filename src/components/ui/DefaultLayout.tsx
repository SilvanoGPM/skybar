import { ReactNode } from 'react';
import { Flex } from '@chakra-ui/react';

import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { OrderPreview } from './OrderPreview';

interface DefaultLayoutProps {
  children: ReactNode;
}

export function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <Flex
      direction="column"
      h="100vh"
      w="100vw"
      maxWidth={1480}
      mx="auto"
      px="6"
      overflowX="hidden"
    >
      <Header />

      <Flex w="100%" my="6">
        <Sidebar />

        {children}
      </Flex>

      <OrderPreview />
    </Flex>
  );
}
