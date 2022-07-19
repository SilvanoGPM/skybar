import { Text } from '@chakra-ui/react';

export function PaginationEllipsis() {
  return (
    <Text
      w="8"
      textAlign="center"
      _dark={{ color: 'gray.300' }}
      _light={{ color: 'gray.600' }}
    >
      ...
    </Text>
  );
}
