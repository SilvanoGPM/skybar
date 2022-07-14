import {
  Box,
  Center,
  Flex,
  Heading,
  Icon,
  Image,
  Text,
} from '@chakra-ui/react';
import Link from 'next/link';
import { RiEyeLine, RiShoppingCartLine } from 'react-icons/ri';

import { Button } from './ui/Button';

interface DrinkCardProps {
  drink: {
    uuid: string;
    name: string;
    picture: string;
    price: string;
  };
}

export function DrinkCard({ drink }: DrinkCardProps) {
  return (
    <Box w="200px" h="260px" rounded="xl" overflow="hidden" pos="relative">
      <Image
        src={drink.picture}
        w="full"
        h="full"
        objectFit="cover"
        pos="absolute"
        zIndex="0"
      />

      <Flex
        direction="column"
        justify="end"
        pos="absolute"
        w="full"
        h="full"
        bg="blackAlpha.700"
      >
        <Box p="4" color="gray.50">
          <Heading as="h3" fontSize="md">
            {drink.name}
          </Heading>

          <Text>{drink.price}</Text>
        </Box>

        <Button rounded="none" leftIcon={<Icon as={RiShoppingCartLine} />}>
          Adicionar
        </Button>
      </Flex>

      <Box
        w="full"
        h="80%"
        pos="absolute"
        zIndex="1"
        opacity={0}
        transition="0.2s opacity"
        _hover={{ opacity: 1 }}
      >
        <Link href={`/drinks/${drink.uuid}`}>
          <a style={{ width: '100%', height: '100%' }}>
            <Center w="full" h="full">
              <Icon as={RiEyeLine} w={10} h={10} />
            </Center>
          </a>
        </Link>
      </Box>
    </Box>
  );
}
