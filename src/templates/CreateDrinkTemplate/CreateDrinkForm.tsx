import {
  Box,
  Button,
  Icon,
  SimpleGrid,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';

import { useState } from 'react';
import { RiAddBoxFill } from 'react-icons/ri';
import { TbBrandBitbucket } from 'react-icons/tb';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from 'react-query';
import * as yup from 'yup';

import { UploadImage } from '$components/form/UploadImage';
import { Input } from '$components/form/Input';
import { Textarea } from '$components/form/Textarea';
import { NumberInput } from '$components/form/NumberInput';
import { Select } from '$components/form/Select';
import { Switch } from '$components/form/Switch';
import { createDrink } from '$services/api/drinks';
import { queryClient } from '$services/queryClient';

interface CreateDrinkFormData {
  name: string;
  description: string;
  additional: Array<{ label: string; value: string }>;
  price: number;
  volume: number;
  alcoholic: boolean;
}

const createDrinkFormSchema = yup.object().shape({
  name: yup
    .string()
    .required('Nome é obrigatório')
    .min(3, 'Pelo menos 3 caracteres'),

  description: yup.string(),
  additional: yup.array(),

  price: yup
    .number()
    .required('Preço é obrigatório')
    .min(0.1, 'O menor preço é R$ 0.1'),

  volume: yup
    .number()
    .required('Volume é obrigatório')
    .min(10, 'O menor volume é 10ml'),

  alcoholic: yup.boolean(),
});
export function CreateDrinkForm() {
  const [file, setFile] = useState<File | null>(null);
  const toast = useToast();

  const createDrinkMutation = useMutation(createDrink, {
    onSuccess: () => queryClient.invalidateQueries('drinks'),
  });

  const { control, register, formState, handleSubmit, reset } =
    useForm<CreateDrinkFormData>({
      resolver: yupResolver(createDrinkFormSchema),
    });

  const handleCreateDrink = handleSubmit(async (data) => {
    try {
      const formattedData = {
        ...data,
        picture: file,
        additional: data.additional?.map(({ value }) => value).join(';'),
      };

      await createDrinkMutation.mutateAsync(formattedData);

      reset();

      toast({
        title: 'Bebida adicionada',
        description: `A bebida ${data.name} foi adicionada com sucesso.`,
        isClosable: true,
        status: 'success',
        duration: 2000,
      });
    } catch {
      toast({
        title: 'Erro ao adicionar bebida',
        description: `Não foi possível adicionar a bebida ${data.name}.`,
        isClosable: true,
        status: 'error',
        duration: 2000,
      });
    }
  });

  return (
    <Box as="form" onSubmit={handleCreateDrink}>
      <VStack spacing={4}>
        <UploadImage
          h={['60', '80']}
          w="full"
          label="Imagem"
          onFileChange={setFile}
        />

        <SimpleGrid minChildWidth="240px" spacing={['6', '8']} w="full">
          <Input
            {...register('name')}
            error={formState.errors.name}
            label="Nome"
          />

          <Select
            name="additional"
            label="Adicionais"
            control={control}
            isMulti
            placeholder="Você pode colocar outros adicionais"
            options={[
              { label: 'gelo', value: 'gelo' },
              { label: 'limão', value: 'limão' },
            ]}
          />
        </SimpleGrid>

        <Textarea
          {...register('description')}
          error={formState.errors.description}
          label="Descrição"
        />

        <SimpleGrid minChildWidth="240px" spacing={['6', '8']} w="full">
          <NumberInput
            name="price"
            control={control}
            icon={<Text fontSize="md">R$</Text>}
            label="Preço"
          />

          <NumberInput
            name="volume"
            control={control}
            icon={<Icon as={TbBrandBitbucket} />}
            label="Volume"
            placeholder="em mililitros"
          />
        </SimpleGrid>

        <Switch
          name="alcoholic"
          label="É uma bebida alcoólica?"
          control={control}
        />

        <Button
          leftIcon={<Icon as={RiAddBoxFill} />}
          isLoading={formState.isSubmitting}
          w="full"
          size="lg"
          type="submit"
        >
          Adicionar bebida
        </Button>
      </VStack>
    </Box>
  );
}
