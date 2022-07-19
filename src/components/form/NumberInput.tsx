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

import { ReactNode } from 'react';
import { Controller } from 'react-hook-form';

interface NumberInputProps extends ChakraNumberInputProps {
  name: string;
  control: any; // eslint-disable-line
  label?: string;
  icon?: ReactNode;
  stepper?: boolean;
}

export function NumberInput({
  name,
  label,
  control,
  icon,
  stepper = true,
  placeholder,
  ...props
}: NumberInputProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, onBlur, value, name, ref },
        fieldState: { error },
      }) => (
        <FormControl isInvalid={Boolean(error)}>
          {Boolean(label) && <FormLabel htmlFor={name}>{label}</FormLabel>}

          <ChakraNumberInput
            ref={ref}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            error={error}
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
      )}
    />
  );
}
