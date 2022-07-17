import { Badge, Icon, Tooltip } from '@chakra-ui/react';

import { RiFireLine } from 'react-icons/ri';

export function HotBadge() {
  return (
    <Tooltip
      label="Esta é uma das bebidas mais pedidas do site"
      bg="red.400"
      color="white"
    >
      <Badge colorScheme="red" fontSize="md" variant="solid">
        <Icon as={RiFireLine} /> Hot
      </Badge>
    </Tooltip>
  );
}
