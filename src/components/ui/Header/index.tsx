import { Center, Flex, Icon, IconButton } from '@chakra-ui/react';
import { BiMenu } from 'react-icons/bi';

import { Logo } from './Logo';
import { UserInfo } from './UserInfo';
import { Actions } from './Actions';

export function Header() {
  return (
    <Flex align="center" justify="space-between" h="24" px="4">
      <Center>
        <IconButton aria-label="Abrir menu" icon={<Icon as={BiMenu} />} />

        <Logo />
      </Center>

      <Flex align="center" justify="flex-end" h="full" w="full">
        <Actions />
        <UserInfo />
      </Flex>
    </Flex>
  );
}
