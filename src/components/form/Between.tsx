import { Box, Flex, FormLabel, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';

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
        <NumberInput
          name={minName}
          control={control}
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
          name={maxName}
          control={control}
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
