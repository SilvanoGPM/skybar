import { Badge, Center, LightMode } from '@chakra-ui/react';

interface AmountBadgeProps {
  amount: number;
}

export function AmountBadge({ amount }: AmountBadgeProps) {
  return (
    <LightMode>
      <Badge
        colorScheme="brand"
        w="6"
        h="6"
        pos="absolute"
        zIndex="1"
        rounded="full"
        right="2"
        top="2"
      >
        <Center h="full">{amount}</Center>
      </Badge>
    </LightMode>
  );
}
