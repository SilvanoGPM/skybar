import {
  Box,
  Button,
  Center,
  Flex,
  Icon,
  IconButton,
  Spacer,
  useBoolean,
  useToast,
  VStack,
} from '@chakra-ui/react';

import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

import { useAuth } from '$contexts/AuthContext';
import { Logo } from '$components/ui/Logo';
import { Input } from '$components/form/Input';
import { ToggleThemeButton } from '$components/ui/ToggleThemeButton';

import {
  glassmorphismContainer,
  glassmorphismInput,
} from '$styles/glassmorphism';

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

  const [showPassword, setShowPassword] = useBoolean(false);

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
    <Flex h="100vh">
      <Box pos="absolute" right="4" top="4">
        <ToggleThemeButton />
      </Box>

      <Center flex="1" bgImg="/images/login.jpg" bgPos="center" bgSize="cover">
        <Box
          maxW="400px"
          w="full"
          p={['6', '8']}
          mx="4"
          my={{ base: '24', md: '0' }}
          rounded="xl"
          textAlign="center"
          sx={glassmorphismContainer}
        >
          <Logo fontSize="3xl" mb="8" display="inline-block" />

          <Box as="form" onSubmit={handleSignIn}>
            <VStack spacing={4}>
              <Input
                {...register('email')}
                error={formState.errors.email}
                type="email"
                label="E-mail"
                sx={glassmorphismInput}
              />

              <Box w="full" pos="relative">
                <Input
                  {...register('password')}
                  error={formState.errors.password}
                  type={showPassword ? 'text' : 'password'}
                  label="Senha"
                  sx={glassmorphismInput}
                />

                <IconButton
                  aria-label="Mostrar senha"
                  onClick={setShowPassword.toggle}
                  pos="absolute"
                  right="4"
                  top="43px"
                  size="sm"
                  variant="unstyled"
                  icon={
                    <Icon
                      as={showPassword ? AiOutlineEyeInvisible : AiOutlineEye}
                    />
                  }
                />
              </Box>

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
