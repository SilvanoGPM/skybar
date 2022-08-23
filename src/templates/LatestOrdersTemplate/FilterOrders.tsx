import {
  Box,
  Button,
  Flex,
  Icon,
  IconButton,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  useDisclosure,
} from '@chakra-ui/react';

import { BsFilterSquare } from 'react-icons/bs';
import { useForm } from 'react-hook-form';

import { Select } from '$components/form/Select';

export type FilterStatus = 'ALL' | 'STARTED' | 'PROCESSING';

interface FilterOrderFormData {
  option: { label: string; value: FilterStatus };
}

interface FilterOrderProps {
  onSubmit: (data: FilterStatus) => void;
}

const orderOptions = [
  { label: 'Todos', value: 'ALL' },
  { label: 'Iniciados', value: 'STARTED' },
  { label: 'Aguardando', value: 'PROCESSING' },
];

export function FilterOrder({ onSubmit }: FilterOrderProps) {
  const disclosure = useDisclosure();

  const { control, handleSubmit } = useForm<FilterOrderFormData>({
    defaultValues: { option: { label: '', value: 'ALL' } },
  });

  const handleFilterOrder = handleSubmit((data) => {
    onSubmit(data.option.value);
    disclosure.onClose();
  });

  return (
    <Popover {...disclosure}>
      <PopoverTrigger>
        <IconButton aria-label="Filtrar" icon={<Icon as={BsFilterSquare} />} />
      </PopoverTrigger>

      <PopoverContent maxW="200px">
        <PopoverCloseButton />
        <PopoverHeader>Filtrar</PopoverHeader>

        <PopoverBody>
          <Box as="form" onSubmit={handleFilterOrder}>
            <Flex gap="4">
              <Select
                name="option"
                control={control}
                placeholder="Ordenação"
                options={orderOptions}
              />
            </Flex>

            <Button type="submit" w="full" mt="4">
              Filtrar
            </Button>
          </Box>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
