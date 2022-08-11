import { ReactNode, useEffect, useState } from 'react';
import { Box, Flex, Heading, Text } from '@chakra-ui/react';

import Lottie from 'react-lottie';

interface OrderStatusProps {
  animationPromise: Promise<object>;
  title: ReactNode;
  description: ReactNode;
}

export function OrderStatus({
  title,
  description,
  animationPromise,
}: OrderStatusProps) {
  const [animation, setAnimation] = useState<object | null>(null);

  useEffect(() => {
    async function loadAnimation() {
      const animation = await animationPromise;
      setAnimation(animation);
    }

    loadAnimation();
  }, [animationPromise]);

  return (
    <Flex align="center" direction={['column', 'column', 'row']}>
      <Box maxW="300px" w="full" mb={['8', '8', '0']}>
        <Lottie isClickToPauseDisabled options={{ animationData: animation }} />
      </Box>

      <Flex direction="column" maxW="600px">
        <Heading as="h4" mb="4" textAlign={['center', 'center', 'left']}>
          {title}
        </Heading>

        <Text textAlign={'justify'}>{description}</Text>
      </Flex>
    </Flex>
  );
}
