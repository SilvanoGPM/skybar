import { Flex, Heading } from '@chakra-ui/react';

import { Breadcrumbs } from '$components/ui/Breadcrumbs';
import { DefaultLayout } from '$components/ui/DefaultLayout';
import { CreateDrinkForm } from './CreateDrinkForm';

export function CreateDrinkTemplate() {
  return (
    <DefaultLayout>
      <Flex direction="column" flex="1">
        <Breadcrumbs
          items={[
            { href: '/', label: 'Início' },
            { href: '/drinks', label: 'Bebidas' },
            { href: '#', label: 'Adicionar bebida' },
          ]}
        />

        <Flex
          direction="column"
          flex="1"
          rounded="xl"
          padding={['4', '4', '8']}
          _dark={{ bg: 'gray.800', color: 'gray.50' }}
          _light={{ bg: 'gray.100', color: 'gray.900' }}
        >
          <Heading
            pb="4"
            mb="4"
            borderBottomWidth="1px"
            borderBottomColor="gray"
          >
            Adicionar bebida
          </Heading>

          <CreateDrinkForm />
        </Flex>
      </Flex>
    </DefaultLayout>
  );
}
