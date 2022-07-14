import { Flex } from '@chakra-ui/react';

import { Header } from '$components/ui/Header';
import { Sidebar } from '$components/ui/Sidebar';

export default function Home() {
  return (
    <Flex minH="100vh" direction="column">
      <Header />
      <Sidebar />
    </Flex>
  );
}
