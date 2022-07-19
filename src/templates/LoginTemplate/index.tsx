import {
  Box,
  Center,
  Flex,
  Heading,
  Spacer,
  useToast,
  VStack,
} from '@chakra-ui/react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useAuth } from '$contexts/AuthContext';
import { Logo } from '$components/ui/Logo';
import { Input } from '$components/form/Input';
import { Button } from '$components/ui/Button';
import { ToggleThemeButton } from '$components/ui/ToggleThemeButton';

interface SignInFormData {
  email: string;
  password: string;
}

const signInFormSchema = yup.object().shape({
  email: yup.string().required('E-mail é obrigatório').email('E-mail inválido'),
  password: yup.string().required('Senha é obrigatória'),
});

export function LoginTemplate() {
  const toast = useToast();
  const { signIn } = useAuth();

  const { register, handleSubmit, formState } = useForm<SignInFormData>({
    resolver: yupResolver(signInFormSchema),
  });

  const handleSignIn = handleSubmit(async (data) => {
    try {
      await signIn(data);
    } catch (error) {
      const err = error as { message: string };

      toast({
        title: 'Erro ao tentar realizar login',
        isClosable: true,
        description: err.message,
        status: 'error',
      });
    }
  });

  return (
    <Flex h="100vh" direction={{ base: 'column', md: 'row' }}>
      <Box pos="absolute" right="4" top={{ base: '265px', md: '4' }}>
        <ToggleThemeButton />
      </Box>

      <Box
        bgImg="/images/login.jpg"
        bgPos="center"
        bgSize="cover"
        flex="1"
        w="full"
        minH="250px"
      />

      <Center flex="1">
        <Box
          maxW="400px"
          w="full"
          h="450px"
          p={['4', '8']}
          mx="4"
          my={{ base: '16', md: '0' }}
          mb="4"
          rounded="xl"
          textAlign="center"
          _dark={{ bg: 'gray.800', color: 'gray.50' }}
          _light={{ bg: 'gray.100', color: 'gray.900' }}
        >
          <Logo fontSize="xl" />

          <Heading as="h3" fontSize={['3xl', '4xl']} mb="8">
            Seja bem vindo!
          </Heading>

          <Box as="form" onSubmit={handleSignIn}>
            <VStack spacing={4} h="full">
              <Input
                {...register('email')}
                error={formState.errors.email}
                type="email"
                label="E-mail"
              />

              <Input
                {...register('password')}
                error={formState.errors.password}
                type="password"
                label="Senha"
              />

              <Spacer />

              <Button w="full" type="submit" isLoading={formState.isSubmitting}>
                Login
              </Button>
            </VStack>
          </Box>
        </Box>
      </Center>
    </Flex>
  );
}
