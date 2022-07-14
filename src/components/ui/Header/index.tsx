import { Center, Flex } from '@chakra-ui/react';

import { useScreenVersion } from '$hooks/useScreenVersion';

import { MenuButton } from './MenuButton';
import { Logo } from './Logo';
import { UserInfo } from './UserInfo';
import { Actions } from './Actions';

export function Header() {
  const { isLargeVersion } = useScreenVersion();

  return (
    <Flex align="center" justify="space-between" h="24" px="4">
      <Center>
        {!isLargeVersion && <MenuButton />}
        <Logo />
      </Center>

      <Flex align="center" justify="flex-end" h="full" w="full">
        <Actions />
        <UserInfo />
      </Flex>
    </Flex>
  );
}
