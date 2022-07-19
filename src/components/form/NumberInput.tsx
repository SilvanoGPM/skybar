import {
  NumberInput as ChakraNumberInput,
  NumberInputProps as ChakraNumberInputProps,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Flex,
  Center,
} from '@chakra-ui/react';

import { forwardRef, ForwardRefRenderFunction, ReactNode } from 'react';

import { FieldError } from 'react-hook-form';

interface NumberInputProps extends ChakraNumberInputProps {
  name: string;
  label?: string;
  icon?: ReactNode;
  stepper?: boolean;
  error?: FieldError;
}

const NumberInputBase: ForwardRefRenderFunction<
  HTMLInputElement,
  NumberInputProps
> = (
  { name, label, error, icon, stepper = true, placeholder, ...props },
  ref,
) => {
  return (
    <FormControl isInvalid={Boolean(error)}>
      {Boolean(label) && <FormLabel htmlFor={name}>{label}</FormLabel>}

      <ChakraNumberInput
        ref={ref}
        id={name}
        name={name}
        variant="filled"
        size="lg"
        overflow="hidden"
        borderWidth="2px"
        borderColor="transparent"
        rounded="md"
        _focusWithin={{ borderColor: 'brand.100' }}
        _focus={{ outline: 'none', borderColor: 'transparent' }}
        {...props}
      >
        <Flex
          _dark={{ bg: 'gray.900', _hover: { bg: 'gray.900' } }}
          _light={{ bg: 'gray.50', _hover: { bg: 'gray.50' } }}
        >
          {Boolean(icon) && (
            <Center
              h="12"
              w="12"
              borderRightWidth="1px"
              borderRightColor="gray"
            >
              {icon}
            </Center>
          )}

          <NumberInputField
            flex="1"
            placeholder={placeholder}
            _dark={{ bg: 'gray.900', _hover: { bg: 'gray.900' } }}
            _light={{ bg: 'gray.50', _hover: { bg: 'gray.50' } }}
            _focus={{ outline: 'none', borderColor: 'transparent' }}
          />
        </Flex>

        {stepper && (
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        )}
      </ChakraNumberInput>

      {error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
};

export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  NumberInputBase,
);
