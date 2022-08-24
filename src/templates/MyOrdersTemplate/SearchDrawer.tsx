import { Divider, Heading, Icon } from '@chakra-ui/react';
import { RiMoneyDollarBoxLine } from 'react-icons/ri';

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

type StatusType = 'PROCESSING' | 'CANCELED' | 'STARTED' | 'FINISHED';

interface SearchOrdersFormData {
  drinkName: string;
  drinkDescription: string;
  greaterThanOrEqualToTotalPrice: number;
  lessThanOrEqualToTotalPrice: number;
  status: SelectOption;
  delivered: SelectOption;
}

export interface SearchOrdersFormDataFormatted
  extends Partial<Omit<SearchOrdersFormData, 'delivered' | 'status'>> {
  status?: StatusType;
  delivered?: string;
}

interface SearchDrawerProps {
  isOpen: boolean;
  onSubmit: (data: SearchOrdersFormDataFormatted) => void;
  onClose: () => void;
}

const deliveredOptions = [
  { label: 'Todos', value: '-1' },
  { label: 'Entregues', value: '1' },
  { label: 'Não entrgues', value: '0' },
];

const statusOptions = [
  { label: 'Aguardando', value: 'PROCESSING' },
  { label: 'Iniciado', value: 'STARTED' },
  { label: 'Finalizado', value: 'FINISHED' },
  { label: 'Cancelado', value: 'CANCELED' },
];

export function SearchDrawer({ isOpen, onSubmit, onClose }: SearchDrawerProps) {
  const { control, register, handleSubmit, reset } =
    useForm<SearchOrdersFormData>({
      defaultValues: {
        delivered: deliveredOptions[0],
      },
    });

  const handleSearch = handleSubmit((data) => {
    onClose();

    onSubmit({
      ...data,
      delivered: data?.delivered?.value,
      status: data?.status?.value as StatusType,
    });
  });

  return (
    <FormDrawer
      title="Pesquisar pedidos"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSearch}
      onReset={reset}
    >
      <Heading as="h5" w="full" fontSize="2xl">
        Pedido
      </Heading>

      <Select
        isClearable
        name="status"
        control={control}
        placeholder="Status do pedido"
        options={statusOptions}
        label="Status do pedido"
      />

      <Select
        isClearable
        name="delivered"
        control={control}
        options={deliveredOptions}
        label="Escolha o filtro de entrega"
      />

      <Between
        icon={<Icon as={RiMoneyDollarBoxLine} />}
        label="Preço"
        minName="greaterThanOrEqualToTotalPrice"
        maxName="lessThanOrEqualToTotalPrice"
        control={control}
        minPlaceholder="0.00"
      />

      <Divider />

      <Heading as="h5" w="full" fontSize="2xl">
        Bebida
      </Heading>

      <Input
        label="Nome"
        placeholder="ex: Coca Cola"
        {...register('drinkName')}
      />

      <Textarea
        label="Descrição"
        resize="vertical"
        maxH="200px"
        {...register('drinkDescription')}
      />
    </FormDrawer>
  );
}
