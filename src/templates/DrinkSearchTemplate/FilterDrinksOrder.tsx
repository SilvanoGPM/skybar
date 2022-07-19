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

interface FilterDrinksOrderFormData {
  order: { label: string; value: string };
}

interface FilterDrinksOrderProps {
  onSubmit: (data: { order: string; sort: 'asc' | 'desc' }) => void;
}

const orderOptions = [
  { label: 'Data de criação', value: 'createdAt' },
  { label: 'Nome', value: 'name' },
  { label: 'Preço', value: 'price' },
  { label: 'Volume', value: 'volume' },
];

export function FilterDrinksOrder({ onSubmit }: FilterDrinksOrderProps) {
  const disclosure = useDisclosure();

  const { control, handleSubmit } = useForm<FilterDrinksOrderFormData>({
    defaultValues: { order: orderOptions[0] },
  });

  const [ascSort, setAscSort] = useBoolean(true);

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
