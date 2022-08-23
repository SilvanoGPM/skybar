import { Badge, Center, Tooltip, TooltipProps } from '@chakra-ui/react';

interface AmountBadgeProps extends Omit<TooltipProps, 'children'> {
  amount: number;
}

export function AmountBadge({ amount, ...props }: AmountBadgeProps) {
  return (
    <Tooltip
      label="Bebidas no pedido"
      bg="brand.100"
      color="white"
      hasArrow
      {...props}
    >
      <Badge bg="brand.100" color="white" w="6" h="6" rounded="full">
        <Center h="full" data-testid="amount-badge">
          {amount}
        </Center>
      </Badge>
    </Tooltip>
  );
}
