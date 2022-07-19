import {
  FormControl,
  FormLabel,
  HStack,
  Switch as ChakraSwitch,
  SwitchProps as ChakraSwitchProps,
} from '@chakra-ui/react';

import { Controller } from 'react-hook-form';

interface SwitchProps extends ChakraSwitchProps {
  name: string;
  label?: string;
  control: any; // eslint-disable-line
}

export function Switch({ name, label, control }: SwitchProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, onBlur, value, name, ref },
        fieldState: { error },
      }) => (
        <FormControl isInvalid={Boolean(error)}>
          <HStack spacing={4} align="center">
            {Boolean(label) && (
              <FormLabel m="0" htmlFor={name}>
                {label}
              </FormLabel>
            )}

            <ChakraSwitch
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              name={name}
              ref={ref}
              size="lg"
              colorScheme="brand"
            />
          </HStack>
        </FormControl>
      )}
    />
  );
}
