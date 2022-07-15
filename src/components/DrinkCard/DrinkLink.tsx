import { Box, Center, Icon } from '@chakra-ui/react';
import Link from 'next/link';
import { RiEyeLine } from 'react-icons/ri';

interface DrinkLinkProps {
  fullHeight: boolean;
  drinkUUID: string;
}

export function DrinkLink({ fullHeight, drinkUUID }: DrinkLinkProps) {
  return (
    <Box
      w="full"
      h={fullHeight ? 'full' : '80%'}
      pos="absolute"
      zIndex="1"
      opacity={0}
      transition="0.2s opacity"
      _hover={{ opacity: 1 }}
    >
      <Link href={`/drinks/${drinkUUID}`}>
        <a style={{ width: '100%', height: '100%' }}>
          <Center w="full" h="full">
            <Icon as={RiEyeLine} w={10} h={10} />
          </Center>
        </a>
      </Link>
    </Box>
  );
}
