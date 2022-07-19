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
import { replaceDrink } from '$services/api/drinks';
import { queryClient } from '$services/queryClient';

interface EditDrinkFormData {
  name: string;
  description: string;
  picture?: string;
  additional: Array<{ label: string; value: string }>;
  price: number;
  volume: number;
  alcoholic: boolean;
}

interface EditDrinkFormProps {
  drink: { uuid: string } & EditDrinkFormData;
}

const editDrinkFormSchema = yup.object().shape({
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

export function EditDrinkForm({ drink }: EditDrinkFormProps) {
  const [file, setFile] = useState<File | null>(null);
  const toast = useToast();

  const editDrinkMutation = useMutation(replaceDrink, {
    onSuccess: () => queryClient.invalidateQueries('drinks'),
  });

  const { control, register, formState, handleSubmit } =
    useForm<EditDrinkFormData>({
      defaultValues: { ...drink },
      resolver: yupResolver(editDrinkFormSchema),
    });

  const handleEditDrink = handleSubmit(async (data) => {
    try {
      const formattedData = {
        ...data,
        picture: file,
        additional: data.additional?.map(({ value }) => value).join(';'),
      };

      await editDrinkMutation.mutateAsync({
        ...formattedData,
        uuid: drink.uuid,
        picture: file || drink.picture || null,
      });

      toast({
        title: 'Bebida atualizada',
        description: `A bebida ${data.name} foi atualizada com sucesso.`,
        isClosable: true,
        status: 'success',
        duration: 2000,
      });
    } catch {
      toast({
        title: 'Erro ao atualizar bebida',
        description: `Não foi possível atualizar a bebida ${data.name}.`,
        isClosable: true,
        status: 'error',
        duration: 2000,
      });
    }
  });

  return (
    <Box as="form" onSubmit={handleEditDrink}>
      <VStack spacing={4}>
        <UploadImage
          h={['60', '80']}
          defaultImage={drink.picture}
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
          label="É uma bebida alcóolica?"
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
