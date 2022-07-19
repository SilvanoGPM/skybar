import { Badge, Center, Tooltip } from '@chakra-ui/react';

interface AmountBadgeProps {
  amount: number;
}

export function AmountBadge({ amount }: AmountBadgeProps) {
  return (
    <Tooltip label="Bebidas no pedido" bg="brand.100" color="white" hasArrow>
      <Badge
        bg="brand.100"
        color="white"
        w="6"
        h="6"
        pos="absolute"
        zIndex="docked"
        rounded="full"
        right="2"
        top="2"
      >
        <Center h="full">{amount}</Center>
      </Badge>
    </Tooltip>
  );
}