import Link from 'next/link';
import { Box, Text, TextProps } from '@chakra-ui/react';

export function Logo(props: TextProps) {
  return (
    <Box maxW="80" mx="2">
      <Link href="/">
        <a>
          <Text
            fontSize={['sm', 'md', '2xl', '3xl']}
            fontWeight="black"
            textTransform="uppercase"
            letterSpacing="tighter"
            {...props}
          >
            Sky
            <Text as="span" mx={['1', '1', '2']}>
              /
            </Text>
            <Text as="span" color="brand.100">
              Bar
            </Text>
          </Text>
        </a>
      </Link>
    </Box>
  );
}
