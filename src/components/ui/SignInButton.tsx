import { Icon } from '@chakra-ui/react';
import { RiLoginBoxLine } from 'react-icons/ri';
import { LinkButton } from './LinkButton';

export function SignInButton() {
  return (
    <LinkButton
      href="/login"
      maxW="150px"
      mode="off"
      colorScheme="gray"
      size={{ base: 'md', lg: 'lg' }}
      leftIcon={<Icon as={RiLoginBoxLine} />}
    >
      Entrar
    </LinkButton>
  );
}
