import { Flex, Text } from '@chakra-ui/react';
import Lottie from 'react-lottie';

interface MedalProps {
  title: string;
  animation: object;
}

export function Medal({ title, animation }: MedalProps) {
  return (
    <Flex
      direction="column"
      maxW={['200px', '250px', '300px', '200px']}
      _dark={{ bg: 'gray.900' }}
      _light={{ bg: 'gray.50' }}
      rounded="xl"
      p="4"
    >
      <Lottie isClickToPauseDisabled options={{ animationData: animation }} />

      <Text fontWeight="semibold" mt="4" textAlign="center">
        {title}
      </Text>
    </Flex>
  );
}
