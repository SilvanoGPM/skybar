import { Divider, Heading, Icon } from '@chakra-ui/react';
import { RiMoneyDollarBoxLine } from 'react-icons/ri';

import { Input } from '$components/form/Input';
import { Textarea } from '$components/form/Textarea';
import { Between } from '$components/form/Between';
import { Select } from '$components/form/Select';
import { useForm } from 'react-hook-form';
import { FormDrawer } from '$components/form/FormDrawer';
import { DateRange } from '$components/form/DateRange';
import { useState } from 'react';
import { formatDateOrderFilter } from '$utils/formatters';

interface SelectOption {
  label: string;
  value: string;
}

type StatusType = 'PROCESSING' | 'CANCELED' | 'STARTED' | 'FINISHED';

interface DatesFilter {
  start: Date | null;
  end: Date | null;
}

interface SearchOrdersFormData {
  drinkName: string;
  drinkDescription: string;
  greaterThanOrEqualToTotalPrice: number;
  lessThanOrEqualToTotalPrice: number;
  status: SelectOption;
  delivered: SelectOption;
  userName: string;
  userEmail: string;
  userCpf: string;
}

export interface SearchOrdersFormDataFormatted
  extends Partial<Omit<SearchOrdersFormData, 'delivered' | 'status'>> {
  status?: StatusType;
  delivered?: string;
  createdInDateOrBefore?: string;
  createdInDateOrAfter?: string;
}

interface SearchDrawerProps {
  searchUser?: boolean;
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

export function SearchDrawer({
  isOpen,
  onSubmit,
  onClose,
  searchUser = false,
}: SearchDrawerProps) {
  const [filterDates, setFilterDates] = useState<DatesFilter>({
    start: null,
    end: null,
  });

  const { control, register, handleSubmit, reset } =
    useForm<SearchOrdersFormData>({
      defaultValues: {
        delivered: deliveredOptions[0],
      },
    });

  const handleSearch = handleSubmit((data) => {
    onClose();

    const dates = {
      createdInDateOrAfter: formatDateOrderFilter(filterDates.start),
      createdInDateOrBefore: formatDateOrderFilter(filterDates.end),
    };

    onSubmit({
      ...data,
      ...dates,
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

      <DateRange
        name="date-picker"
        label="Período"
        onSubmit={setFilterDates}
        startPlaceholder="Data de início"
        endPlaceholder="Data final"
      />

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
        label="Entrega do pedido"
        placeholder="Entrega do pedido"
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
        label="Nome da bebida"
        placeholder="ex: Coca Cola"
        {...register('drinkName')}
      />

      <Textarea
        label="Descrição da bebida"
        resize="vertical"
        maxH="200px"
        {...register('drinkDescription')}
      />

      {searchUser && (
        <>
          <Divider />

          <Heading as="h5" w="full" fontSize="2xl">
            Usuário
          </Heading>

          <Input
            label="Nome do usuário"
            placeholder="ex: João"
            {...register('userName')}
          />

          <Input
            label="CPF do usuário"
            placeholder="ex: 132.106.250-85"
            {...register('userCpf')}
          />

          <Input
            label="E-mail do usuário"
            placeholder="ex: joão@mail.com"
            {...register('userEmail')}
          />
        </>
      )}
    </FormDrawer>
  );
}
