import { ReactNode } from 'react';

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  Button,
  Text,
  VStack,
} from '@chakra-ui/react';

import { useAuth } from '$contexts/AuthContext';

import { PopoverLink } from './PopoverLink';
import { OneLineText } from '../OneLineText';

interface UserInfoPopoverProps {
  children: ReactNode;
}

export function UserInfoPopover({ children }: UserInfoPopoverProps) {
  const { signOut, user } = useAuth();

  return (
    <Popover placement="left-start">
      <PopoverTrigger>
        <Button variant="unstyled">{children}</Button>
      </PopoverTrigger>
      <PopoverContent
        _dark={{ bg: 'gray.900' }}
        _light={{ bg: 'gray.50' }}
        maxW="200px"
      >
        <PopoverArrow />

        <PopoverHeader fontSize="sm">
          <OneLineText maxW="100%">
            Logado como{' '}
            <Text as="span" fontWeight="bold">
              {user?.name}
            </Text>
          </OneLineText>
        </PopoverHeader>

        <PopoverBody>
          <VStack align="start">
            <PopoverLink href={`/users/${user?.uuid}`}>Meu perfil</PopoverLink>
            <PopoverLink href="/orders/my">Meus pedidos</PopoverLink>
          </VStack>
        </PopoverBody>

        <PopoverFooter>
          <Button variant="unstyled" onClick={signOut}>
            Sair
          </Button>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
}
