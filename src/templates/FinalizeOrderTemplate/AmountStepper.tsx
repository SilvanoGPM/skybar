import {
  Button,
  Flex,
  HStack,
  Icon,
  IconButton,
  Input,
  LightMode,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  useDisclosure,
} from '@chakra-ui/react';

import { BiTrash } from 'react-icons/bi';

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

  const removeDisclosure = useDisclosure();

  const decrementButtonProps = {
    'aria-label': 'Decrementar',
    size: 'sm',
    color: 'white',
    roundedLeft: 'md',
    roundedRight: 'none',
  };

  const DecrementButton = isLast ? (
    <Popover {...removeDisclosure}>
      <LightMode>
        <PopoverTrigger>
          <IconButton
            icon={<Icon as={BiTrash} />}
            colorScheme="red"
            {...decrementButtonProps}
          />
        </PopoverTrigger>
      </LightMode>

      <Portal>
        <PopoverContent>
          <PopoverHeader display="flex" justifyContent="space-between">
            {removeOptions.title}
            <PopoverCloseButton pos="static" />
          </PopoverHeader>

          <PopoverBody>{removeOptions.body}</PopoverBody>

          <PopoverFooter>
            <HStack w="full" justify="end">
              <Button onClick={removeDisclosure.onClose} size="sm">
                Não
              </Button>

              <Button
                size="sm"
                onClick={() => {
                  removeDisclosure.onClose();
                  onDecrement();
                }}
              >
                Sim
              </Button>
            </HStack>
          </PopoverFooter>
        </PopoverContent>
      </Portal>
    </Popover>
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
