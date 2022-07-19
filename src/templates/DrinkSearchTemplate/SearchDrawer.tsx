import { Icon } from '@chakra-ui/react';
import { RiMoneyDollarBoxLine } from 'react-icons/ri';
import { TbBrandBitbucket } from 'react-icons/tb';

import { Input } from '$components/form/Input';
import { Textarea } from '$components/form/Textarea';
import { Between } from '$components/form/Between';
import { Select } from '$components/form/Select';
import { useForm } from 'react-hook-form';
import { FormDrawer } from '$components/form/FormDrawer';

interface SelectOption {
  label: string;
  value: string;
}

interface SearchDrinksFormData {
  name: string;
  description: string;
  alcoholic: SelectOption;
  additional: SelectOption[];
  greaterThanOrEqualToPrice: number;
  lessThanOrEqualToPrice: number;
  greaterThanOrEqualToVolue: number;
  lessThanOrEqualToVolume: number;
}

export interface SearchDrinksFormDataFormatted
  extends Partial<Omit<SearchDrinksFormData, 'alcoholic' | 'additional'>> {
  additional?: string;
  alcoholic?: string;
}

interface SearchDrawerProps {
  isOpen: boolean;
  onSubmit: (data: SearchDrinksFormDataFormatted) => void;
  onClose: () => void;
}

const alcoholicOptions = [
  { label: 'Todas', value: '-1' },
  { label: 'Alcóolicas', value: '1' },
  { label: 'Não alcóolicas', value: '0' },
];

export function SearchDrawer({ isOpen, onSubmit, onClose }: SearchDrawerProps) {
  const { control, register, handleSubmit, reset } =
    useForm<SearchDrinksFormData>({
      defaultValues: { alcoholic: alcoholicOptions[0] },
    });

  const handleSearch = handleSubmit((data) => {
    onClose();

    onSubmit({
      ...data,
      additional: data?.additional?.map(({ value }) => value).join(';'),
      alcoholic: data?.alcoholic?.value,
    });
  });

  return (
    <FormDrawer
      title="Pesquisar bebida"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSearch}
      onReset={reset}
    >
      <Input label="Nome" placeholder="ex: Coca Cola" {...register('name')} />

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
        control={control}
        minPlaceholder="0.00"
      />

      <Between
        icon={<Icon as={TbBrandBitbucket} />}
        control={control}
        label="Volume (ml)"
        minName="greaterThanOrEqualToVolume"
        maxName="lessThanOrEqualToVolume"
        minPlaceholder="0 ml"
        maxPlaceholder="2000 ml"
      />
    </FormDrawer>
  );
}
