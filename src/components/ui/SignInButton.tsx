import { Button, Icon } from '@chakra-ui/react';
import Link from 'next/link';
import { RiLoginBoxLine } from 'react-icons/ri';

export function SignInButton() {
  return (
    <Link href="/login">
      <a>
        <Button
          colorScheme="gray"
          size={{ base: 'md', lg: 'lg' }}
          leftIcon={<Icon as={RiLoginBoxLine} />}
        >
          Entrar
        </Button>
      </a>
    </Link>
  );
}
