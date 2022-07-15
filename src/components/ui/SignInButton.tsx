import { Icon } from '@chakra-ui/react';
import Link from 'next/link';
import { RiLoginBoxLine } from 'react-icons/ri';

import { useScreenVersion } from '$hooks/useScreenVersion';

import { ResponsiveButton } from './ResponsiveButton';

export function SignInButton() {
  const { isLargeVersion } = useScreenVersion();

  return (
    <Link href="/login">
      <a>
        <ResponsiveButton
          aria-label="Entrar"
          colorScheme="gray"
          onlyIcon={!isLargeVersion}
          size={{ base: 'md', lg: 'lg' }}
          leftIcon={<Icon as={RiLoginBoxLine} />}
        />
      </a>
    </Link>
  );
}
