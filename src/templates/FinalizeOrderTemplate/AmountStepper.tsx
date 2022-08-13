import {
  Button,
  Flex,
  Icon,
  IconButton,
  Input,
  LightMode,
} from '@chakra-ui/react';

import { BiTrash } from 'react-icons/bi';

import { ConfirmPopover } from '$components/ui/ConfirmPopover';

interface AmountStepperProps {
  value: number;
  removeOptions: {
    title: string;
    body: string;
  };
  onIncrement: () => void;
  onDecrement: () => void;
}

export function AmountStepper({
  value,
  removeOptions,
  onDecrement,
  onIncrement,
}: AmountStepperProps) {
  const isLast = value === 1;

  const decrementButtonProps = {
    'aria-label': 'Decrementar',
    size: 'sm',
    color: 'white',
    roundedLeft: 'md',
    roundedRight: 'none',
  };

  const DecrementButton = isLast ? (
    <ConfirmPopover
      header={removeOptions.title}
      body={removeOptions.body}
      onFinish={(disclosure) => {
        disclosure.onClose?.();
        onDecrement();
      }}
    >
      <IconButton
        icon={<Icon as={BiTrash} />}
        colorScheme="red"
        {...decrementButtonProps}
      />
    </ConfirmPopover>
  ) : (
    <LightMode>
      <Button
        colorScheme="brand"
        onClick={onDecrement}
        {...decrementButtonProps}
      >
        -
      </Button>
    </LightMode>
  );

  return (
    <Flex maxW={['full', '120px']}>
      {DecrementButton}

      <Input
        textAlign="center"
        focusBorderColor="brand.100"
        readOnly
        value={value}
        size="sm"
      />

      <Button
        aria-label="Incrementar"
        roundedLeft="none"
        roundedRight="md"
        onClick={onIncrement}
        size="sm"
      >
        +
      </Button>
    </Flex>
  );
}
