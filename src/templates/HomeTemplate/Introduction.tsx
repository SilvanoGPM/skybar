import { Box, Center, Flex, Heading, Text } from '@chakra-ui/react';
import Lottie from 'react-lottie';

import animation from '$assets/lottie/drinks-animation.json';
import { HighlightedText } from '$components/ui/HighlightedText';

export function Introduction() {
  return (
    <Center
      flexDir={{ base: 'column-reverse', md: 'row' }}
      mb={{ base: '12', md: '0' }}
    >
      <Flex direction="column" flex="1">
        <Heading fontSize={['2xl', '3xl', '4xl']} mb="4">
          Seu dia foi <HighlightedText>cansativo</HighlightedText> ?
        </Heading>

        <Text maxW="500px" fontSize="xl">
          Relaxa, venha curtir com seus amigos, colocar a conversa em dia, dar
          boas gargalhadas e de quebra beber aquele{' '}
          <HighlightedText>drink</HighlightedText> que você ama.
        </Text>
      </Flex>

      <Box maxW={{ base: '200px', md: '400px' }}>
        <Lottie
          isClickToPauseDisabled={true}
          options={{
            animationData: animation,
          }}
        />
      </Box>
    </Center>
  );
}
