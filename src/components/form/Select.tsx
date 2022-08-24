import { Controller, FieldError } from 'react-hook-form';
import { Select as ChakraSelect, CreatableSelect } from 'chakra-react-select';

import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
} from '@chakra-ui/react';

interface SelectProps {
  name: string;
  error?: FieldError;
  label?: string;
  placeholder?: string;
  noOptionsMessage?: string;
  options?: Array<{ label: string; value: string }>;
  isMulti?: boolean;
  isClearable?: boolean;
  control: any; // eslint-disable-line
}

export function Select({
  name,
  label,
  options = [],
  control,
  placeholder,
  noOptionsMessage,
  isClearable = false,
  isMulti = false,
}: SelectProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, onBlur, value, name, ref },
        fieldState: { error },
      }) => {
        const selectProps = {
          isMulti: isMulti,
          options: options,
          name: name,
          ref: ref,
          instanceId: name,
          id: name,
          selectedOptionColor: 'pink',
          focusBorderColor: 'brand.100',
          onChange: onChange,
          onBlur: onBlur,
          size: 'lg' as const,
          useBasicStyles: true,
          value: value,
          placeholder: placeholder,
        };

        return (
          <FormControl isInvalid={Boolean(error)}>
            {Boolean(label) && <FormLabel htmlFor={name}>{label}</FormLabel>}

            <Box
              _dark={{ bg: 'gray.900', _hover: { bg: 'gray.900' } }}
              _light={{ bg: 'gray.50', _hover: { bg: 'gray.50' } }}
              rounded="md"
            >
              {isMulti ? (
                <CreatableSelect
                  {...selectProps}
                  isClearable={isClearable}
                  noOptionsMessage={() => noOptionsMessage}
                />
              ) : (
                <ChakraSelect {...selectProps} isClearable={isClearable} />
              )}
            </Box>

            {error && <FormErrorMessage>{error.message}</FormErrorMessage>}
          </FormControl>
        );
      }}
    />
  );
}
