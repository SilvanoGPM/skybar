import { Center, Heading, Icon, Text } from '@chakra-ui/react';

import { AiOutlineInbox } from 'react-icons/ai';

interface EmptyProps {
  title: string;
  message?: string;
}

export function Empty({ title, message }: EmptyProps) {
  return (
    <Center flexDir="column" h="80%">
      <Icon as={AiOutlineInbox} fontSize={['4xl', '5xl', '6xl']} />
      <Heading
        as="h5"
        fontWeight="semibold"
        my={['2', '4', '6']}
        textAlign="center"
      >
        {title}
      </Heading>

      {message && (
        <Text mt="2" textAlign="center">
          {message}
        </Text>
      )}
    </Center>
  );
}
