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
  useBoolean,
  useDisclosure,
} from '@chakra-ui/react';

import {
  BsFilterSquare,
  BsFillCaretUpFill,
  BsFillCaretDownFill,
} from 'react-icons/bs';

import { Select } from '$components/form/Select';
import { useForm } from 'react-hook-form';

interface FilterOrdersFormData {
  order: { label: string; value: string };
}

interface FilterOrdersProps {
  onSubmit: (data: { order: string; sort: 'asc' | 'desc' }) => void;
}

const orderOptions = [
  { label: 'Data de criação', value: 'createdAt' },
  { label: 'Data de atualização', value: 'updatedAt' },
  { label: 'Preço', value: 'totalPrice' },
];

export function FilterOrders({ onSubmit }: FilterOrdersProps) {
  const disclosure = useDisclosure();

  const { control, handleSubmit } = useForm<FilterOrdersFormData>({
    defaultValues: { order: orderOptions[1] },
  });

  const [ascSort, setAscSort] = useBoolean(false);

  const handleFilterOrder = handleSubmit((data) => {
    onSubmit({ order: data.order.value, sort: ascSort ? 'asc' : 'desc' });
    disclosure.onClose();
  });

  return (
    <Popover {...disclosure}>
      <PopoverTrigger>
        <IconButton aria-label="Ordenar" icon={<Icon as={BsFilterSquare} />} />
      </PopoverTrigger>

      <PopoverContent>
        <PopoverCloseButton />
        <PopoverHeader>Ordenar</PopoverHeader>

        <PopoverBody>
          <Box as="form" onSubmit={handleFilterOrder}>
            <Flex gap="4">
              <Select
                name="order"
                control={control}
                placeholder="Ordenação"
                options={orderOptions}
              />

              <IconButton
                aria-label="Alternar organização"
                onClick={setAscSort.toggle}
                colorScheme="gray"
                color="white"
                size="lg"
                icon={
                  <Icon
                    as={ascSort ? BsFillCaretUpFill : BsFillCaretDownFill}
                  />
                }
              />
            </Flex>

            <Button type="submit" w="full" mt="4">
              Ordenar
            </Button>
          </Box>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
