import { Box, Button, Flex, Heading, Icon, Text } from '@chakra-ui/react';
import Lottie from 'react-lottie';

import animation from '$assets/lottie/not-found.json';
import { BiHome } from 'react-icons/bi';
import Link from 'next/link';
import { HighlightedText } from '$components/ui/HighlightedText';

export function NotFoundTemplate() {
  return (
    <Flex direction="column" align="center" mx="4" textAlign="center">
      <Lottie
        isClickToPauseDisabled
        width="300px"
        height="300px"
        options={{
          animationData: animation,
          loop: true,
          autoplay: true,
        }}
      />

      <Heading mt="8">Página não encontrada 🥴</Heading>

      <Text mt="4" fontSize={{ base: 'md', md: 'xl' }}>
        Parece que você <HighlightedText>bebeu</HighlightedText> demais e se
        perdeu. <Box as="br" display={{ base: 'none', md: 'block' }} /> Sem
        problemas, volte para a <HighlightedText>página inical</HighlightedText>{' '}
        e recomece.
      </Text>

      <Link href="/">
        <a>
          <Button leftIcon={<Icon as={BiHome} />} mt="4">
            Voltar pra o início
          </Button>
        </a>
      </Link>
    </Flex>
  );
}
