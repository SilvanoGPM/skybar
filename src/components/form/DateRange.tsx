import { Box, FormLabel, HStack, StackProps, Text } from '@chakra-ui/react';
import { useState } from 'react';
import DatePicker from 'react-datepicker';

import { Input } from './Input';

import 'react-datepicker/dist/react-datepicker.css';

interface DateRangeProps extends Omit<StackProps, 'onSubmit'> {
  label?: string;
  startPlaceholder?: string;
  endPlaceholder?: string;
  name: string;
  onSubmit: ({ start, end }: { start: Date | null; end: Date | null }) => void;
}

export function DateRange({
  name,
  label,
  onSubmit,
  startPlaceholder,
  endPlaceholder,
  ...props
}: DateRangeProps) {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  return (
    <Box>
      {Boolean(label) && <FormLabel htmlFor={name}>{label}</FormLabel>}

      <HStack spacing="2" w="full" flex="1" {...props}>
        <DatePicker
          name={name}
          selected={startDate}
          onChange={(date) => {
            setStartDate(date);
            onSubmit({ end: endDate, start: date });
          }}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          placeholderText={startPlaceholder}
          customInput={<Input name="start" />}
        />

        <Text>-</Text>

        <DatePicker
          selected={endDate}
          onChange={(date) => {
            setEndDate(date);
            onSubmit({ end: date, start: startDate });
          }}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          placeholderText={endPlaceholder}
          customInput={<Input name="end" />}
        />
      </HStack>
    </Box>
  );
}
