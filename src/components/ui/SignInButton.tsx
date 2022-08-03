import { Icon } from '@chakra-ui/react';
import { RiLoginBoxLine } from 'react-icons/ri';
import { LinkButton } from './LinkButton';

export function SignInButton() {
  return (
    <LinkButton
      href="/login"
      colorScheme="gray"
      size={{ base: 'md', lg: 'lg' }}
      leftIcon={<Icon as={RiLoginBoxLine} />}
    >
      Entrar
    </LinkButton>
  );
}
