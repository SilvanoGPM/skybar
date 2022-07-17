import { Box, Flex, Image, Link as ChakraLink, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { HighlightedText } from '../HighlightedText';

import { OneLineText } from '../OneLineText';

interface DrinkItemProps {
  drink: {
    uuid: string;
    picture: string;
    name: string;
    priceFormatted: string;
    amount: number;
  };
}

export function DrinkItem({ drink }: DrinkItemProps) {
  return (
    <Flex key={drink.uuid}>
      <Image
        objectFit="cover"
        w="14"
        h="14"
        src={drink.picture}
        mr="4"
        rounded="xl"
      />

      <Box>
        <Link href={`/drinks/${drink.uuid}`} passHref>
          <ChakraLink>
            <OneLineText maxW="130px">{drink.name}</OneLineText>
          </ChakraLink>
        </Link>

        <Text>
          {drink.priceFormatted}{' '}
          <HighlightedText>x{drink.amount}</HighlightedText>
        </Text>
      </Box>
    </Flex>
  );
}
