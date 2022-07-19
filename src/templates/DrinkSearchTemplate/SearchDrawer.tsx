import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Icon,
  VStack,
} from '@chakra-ui/react';

import { RiMoneyDollarBoxLine, RiSearchLine } from 'react-icons/ri';
import { TbBrandBitbucket } from 'react-icons/tb';

import { Input } from '$components/form/Input';
import { Textarea } from '$components/form/Textarea';
import { Between } from '$components/form/Between';
import { Select } from '$components/form/Select';
import { useForm } from 'react-hook-form';
import { BiTrashAlt } from 'react-icons/bi';

interface SearchDrinksFormData {
  name: string;
  description: string;
  alcoholic: { label: string; value: string };
  additional: { label: string; value: string };
  greaterThanOrEqualToPrice: number;
  lessThanOrEqualToPrice: number;
  greaterThanOrEqualToVolue: number;
  lessThanOrEqualToVolume: number;
}

interface SearchDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const alcoholicOptions = [
  { label: 'Todas', value: '-1' },
  { label: 'Alcóolicas', value: '1' },
  { label: 'Não alcóolicas', value: '0' },
];

export function SearchDrawer({ isOpen, onClose }: SearchDrawerProps) {
  const { control, register, handleSubmit } = useForm<SearchDrinksFormData>({
    defaultValues: { alcoholic: alcoholicOptions[0] },
  });

  const handleSearch = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <Drawer isOpen={isOpen} onClose={onClose} size="sm">
      <DrawerOverlay>
        <DrawerContent _dark={{ bg: 'gray.900' }} _light={{ bg: 'gray.50' }}>
          <DrawerCloseButton />

          <DrawerHeader p="4">Pesquisar bebida</DrawerHeader>

          <DrawerBody p="4">
            <Box
              onSubmit={handleSearch}
              as="form"
              p="4"
              rounded="xl"
              _dark={{ bg: 'gray.800' }}
              _light={{ bg: 'gray.100' }}
            >
              <VStack spacing="4">
                <Input
                  label="Nome"
                  placeholder="ex: Coca Cola"
                  {...register('name')}
                />

                <Textarea
                  label="Descrição"
                  resize="vertical"
                  maxH="200px"
                  {...register('description')}
                />

                <Select
                  name="alcoholic"
                  control={control}
                  placeholder="Escolha o tipo da bebida"
                  options={alcoholicOptions}
                  label="Tipo"
                />

                <Select
                  isMulti
                  name="additional"
                  control={control}
                  placeholder="ex: gelo"
                  noOptionsMessage="Novo adicional"
                  label="Adicionais"
                />

                <Between
                  icon={<Icon as={RiMoneyDollarBoxLine} />}
                  label="Preço"
                  minName="greaterThanOrEqualToPrice"
                  maxName="lessThanOrEqualToPrice"
                  register={register}
                  minPlaceholder="0.00"
                />

                <Between
                  icon={<Icon as={TbBrandBitbucket} />}
                  register={register}
                  label="Volume (ml)"
                  minName="greaterThanOrEqualToVolume"
                  maxName="lessThanOrEqualToVolume"
                  minPlaceholder="0 ml"
                  maxPlaceholder="2000 ml"
                />

                <Button
                  type="submit"
                  rightIcon={<Icon as={RiSearchLine} />}
                  w="full"
                >
                  Pesquisar
                </Button>

                <Button
                  type="submit"
                  variant="outline"
                  rightIcon={<Icon as={BiTrashAlt} />}
                  w="full"
                >
                  Limpar
                </Button>
              </VStack>
            </Box>
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
}
