import Lottie from 'react-lottie';
import { Box, Center, Heading, Icon, Stack, Text } from '@chakra-ui/react';

import { LinkButton } from '$components/ui/LinkButton';
import animation from '$assets/lottie/order-received.json';
import { BiHome } from 'react-icons/bi';
import { BsFillEyeFill } from 'react-icons/bs';

interface OrderFinalizeSuccessProps {
  orderUUID: string;
}

export function OrderFinalizeSuccess({ orderUUID }: OrderFinalizeSuccessProps) {
  return (
    <Center
      flexDir="column"
      rounded="xl"
      padding={['4', '4', '8']}
      _dark={{ bg: 'gray.800', color: 'gray.50' }}
      _light={{ bg: 'gray.100', color: 'gray.900' }}
    >
      <Heading mb="4" textAlign="center">
        Seu pedido foi recebido ✅
      </Heading>

      <Box maxW="300px" my="8">
        <Lottie isClickToPauseDisabled options={{ animationData: animation }} />
      </Box>

      <Text
        fontSize={['xl', '2xl']}
        fontWeight="bold"
        textAlign="center"
        mb="2"
      >
        Muito obrigado pela compra 😁
      </Text>

      <Text maxW="500px" textAlign="center">
        Assim que seu pedido estiver pronto entraremos em contato por aqui
        mesmo, então fique de olho 👀.
      </Text>

      <Stack
        mt="8"
        direction={['column', 'column', 'row']}
        spacing="4"
        flexWrap="wrap"
        align="center"
        justify="center"
        w="full"
        flex="1"
      >
        <LinkButton href="/" leftIcon={<Icon as={BiHome} />} maxW="300px">
          Voltar para o ínicio
        </LinkButton>

        <LinkButton
          maxW="300px"
          href={`/orders/${orderUUID}`}
          leftIcon={<Icon as={BsFillEyeFill} />}
        >
          Ver pedido
        </LinkButton>
      </Stack>
    </Center>
  );
}
