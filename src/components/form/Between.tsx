import { Box, Flex, FormLabel, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { UseFormRegister } from 'react-hook-form';
import { NumberInput } from './NumberInput';

interface BetweenProps {
  minName: string;
  maxName: string;
  register: UseFormRegister<any>; // eslint-disable-line
  minPlaceholder?: string;
  maxPlaceholder?: string;
  label?: string;
  icon?: ReactNode;
  min?: number;
  max?: number;
}

export function Between({
  minName,
  maxName,
  minPlaceholder,
  maxPlaceholder,
  register,
  label,
  icon,
  min,
  max,
}: BetweenProps) {
  const minRegister = register(minName);
  const maxRegister = register(maxName);

  return (
    <Box>
      {Boolean(label) && <FormLabel htmlFor={minName}>{label}</FormLabel>}

      <Flex align="center">
        <NumberInput
          name={minRegister.name}
          ref={minRegister.ref}
          min={min}
          max={max}
          icon={icon}
          stepper={false}
          placeholder={minPlaceholder}
        />

        <Text fontSize="xl" mx="1">
          -
        </Text>

        <NumberInput
          name={maxRegister.name}
          ref={maxRegister.ref}
          min={min}
          max={max}
          icon={icon}
          stepper={false}
          placeholder={maxPlaceholder}
        />
      </Flex>
    </Box>
  );
}
