import { Box, Center, Flex, Heading, Text } from '@chakra-ui/react';
import Lottie from 'react-lottie';

import animation from '$assets/lottie/drinks-animation.json';

export function Introduction() {
  return (
    <Center
      flexDir={{ base: 'column-reverse', md: 'row' }}
      mb={{ base: '12', md: '0' }}
    >
      <Flex direction="column" flex="1">
        <Heading fontSize={['2xl', '3xl', '4xl']} mb="4">
          Seu dia foi{' '}
          <Text as="span" fontWeight="bold" color="brand.100">
            cansativo
          </Text>{' '}
          ?
        </Heading>

        <Text maxW="500px" fontSize="xl">
          Relaxa, venha curtir com seus amigos, colocar a conversa em dia, dar
          boas gargalhadas e de quebra beber aquele{' '}
          <Text as="span" fontWeight="bold" color="brand.100">
            drink
          </Text>{' '}
          que você ama.
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
