import { Box, Flex, FormLabel, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { Controller } from 'react-hook-form';

import { NumberInput } from './NumberInput';

interface BetweenProps {
  minName: string;
  maxName: string;
  control: any; // eslint-disable-line
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
  label,
  control,
  icon,
  min,
  max,
}: BetweenProps) {
  return (
    <Box>
      {Boolean(label) && <FormLabel htmlFor={minName}>{label}</FormLabel>}

      <Flex align="center">
        <Controller
          name={minName}
          control={control}
          render={({
            field: { onChange, onBlur, value, name, ref },
            fieldState: { error },
          }) => (
            <NumberInput
              name={name}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              error={error}
              ref={ref}
              min={min}
              max={max}
              icon={icon}
              stepper={false}
              placeholder={minPlaceholder}
            />
          )}
        />

        <Text fontSize="xl" mx="1">
          -
        </Text>

        <Controller
          name={maxName}
          control={control}
          render={({
            field: { onChange, onBlur, value, name, ref },
            fieldState: { error },
          }) => (
            <NumberInput
              name={name}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              error={error}
              ref={ref}
              min={min}
              max={max}
              icon={icon}
              stepper={false}
              placeholder={maxPlaceholder}
            />
          )}
        />
      </Flex>
    </Box>
  );
}
