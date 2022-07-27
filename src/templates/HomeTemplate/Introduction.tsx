import { Box, Center, Flex, Heading, Text } from '@chakra-ui/react';
import Lottie from 'react-lottie';

import animation from '$assets/lottie/home-drinks.json';
import { HighlightedText } from '$components/ui/HighlightedText';
import { Link } from '$components/ui/Link';

export function Introduction() {
  return (
    <Center
      flexDir={{ base: 'column-reverse', lg: 'row' }}
      mb={{ base: '12', lg: '8' }}
      rounded="xl"
      p="8"
      _dark={{ bg: 'gray.800', color: 'gray.50' }}
      _light={{ bg: 'gray.100', color: 'gray.900' }}
    >
      <Flex direction="column" flex="1">
        <Heading fontSize={['2xl', '3xl', '4xl']} mb="4">
          Seu dia foi <HighlightedText>cansativo</HighlightedText> ?
        </Heading>

        <Text maxW="500px" fontSize="xl" textAlign="justify">
          Relaxa, venha curtir com seus amigos, colocar a conversa em dia, dar
          boas gargalhadas e de quebra beber aquela{' '}
          <Link href="/drinks">bebida</Link> que você ama.
        </Text>
      </Flex>

      <Box maxW={{ base: '200px', lg: '300px' }}>
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
