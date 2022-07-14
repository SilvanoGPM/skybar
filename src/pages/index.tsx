import { Center, Text } from '@chakra-ui/react';

import { DefaultLayout } from '$components/ui/DefaultLayout';

export default function Home() {
  return (
    <DefaultLayout>
      <Center h="full" w="100%">
        <Text fontSize="2xl">Home</Text>
      </Center>
    </DefaultLayout>
  );
}
