import { Badge, Icon, Tooltip } from '@chakra-ui/react';

import { BiStopwatch } from 'react-icons/bi';

export function NewBadge() {
  return (
    <Tooltip
      label="Esta é uma das últimas bebidas adicionadas no site"
      bg="green.400"
      color="white"
    >
      <Badge colorScheme="green" fontSize="md" variant="solid">
        <Icon as={BiStopwatch} /> New
      </Badge>
    </Tooltip>
  );
}
