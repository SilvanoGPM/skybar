import { Center, Flex, Spinner } from '@chakra-ui/react';

import { useScreenVersion } from '$hooks/useScreenVersion';
import { useAuth } from '$contexts/AuthContext';

import { MenuButton } from './MenuButton';
import { Logo } from './Logo';
import { UserInfo } from './UserInfo';
import { Actions } from './Actions';
import { SignInButton } from '../SignInButton';

export function Header() {
  const { isAuthenticated, isLoading } = useAuth();
  const { isLargeVersion } = useScreenVersion();

  return (
    <Flex align="center" justify="space-between" h="24">
      <Center>
        {!isLargeVersion && <MenuButton />}
        <Logo />
      </Center>

      <Flex align="center" justify="flex-end" h="full" w="full">
        <Actions />

        {isAuthenticated ? (
          <UserInfo />
        ) : isLoading ? (
          <Spinner />
        ) : (
          <SignInButton />
        )}
      </Flex>
    </Flex>
  );
}
