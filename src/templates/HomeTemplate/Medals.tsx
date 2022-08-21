import { Box, Flex, Heading } from '@chakra-ui/react';

import drinkMedal1 from '$assets/lottie/drink-medal-1.json';
import drinkMedal2 from '$assets/lottie/drink-medal-2.json';
import drinkMedal3 from '$assets/lottie/drink-medal-3.json';
import drinkMedal4 from '$assets/lottie/drink-medal-4.json';

import { Medal } from './Medal';

export function Medals() {
  return (
    <Box
      rounded="xl"
      mb={{ base: '12', lg: '8' }}
      p="8"
      _dark={{ bg: 'gray.800', color: 'gray.50' }}
      _light={{ bg: 'gray.100', color: 'gray.900' }}
    >
      <Heading fontSize={['2xl', '3xl', '4xl']} mb="4">
        Várias bebidas
      </Heading>

      <Flex
        align="center"
        justify={{ base: 'center', xl: 'space-between' }}
        gap="1rem"
        flexWrap="wrap"
      >
        <Medal title="Vitaminas" animation={drinkMedal1} />
        <Medal title="Energéticos" animation={drinkMedal2} />
        <Medal title="Gelados" animation={drinkMedal3} />
        <Medal title="Alcoólicos" animation={drinkMedal4} />
      </Flex>
    </Box>
  );
}
