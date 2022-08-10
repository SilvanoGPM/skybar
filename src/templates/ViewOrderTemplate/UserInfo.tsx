import { Avatar, Flex, Icon, Spacer, VStack } from '@chakra-ui/react';
import { AiOutlineMail } from 'react-icons/ai';
import { FaBirthdayCake } from 'react-icons/fa';

import { LinkButton } from '$components/ui/LinkButton';
import { OneLineText } from '$components/ui/OneLineText';

interface User {
  name: string;
  image: string;
  email: string;
  uuid: string;
  age: string;
}

interface UserInfoProps {
  user: User;
}

export function UserInfo({ user }: UserInfoProps) {
  return (
    <Flex direction={['column', 'column', 'row']} align="center">
      <Avatar
        rounded="none"
        name={user.name}
        src={user.image}
        w={['20', '40']}
        h={['20', '40']}
        mr="8"
        mb={['4', '4', '0']}
      />

      <Flex direction="column">
        <OneLineText fontSize={['2xl', '3xl']} fontWeight="bold" maxW="250px">
          {user.name}
        </OneLineText>

        <VStack spacing="2" align="start">
          <Flex align="center" color="gray.500">
            <Icon as={AiOutlineMail} mr="2" />

            <OneLineText maxW="250px">{user.email}</OneLineText>
          </Flex>

          <Flex align="center" color="gray.500">
            <Icon as={FaBirthdayCake} mr="2" />

            <OneLineText maxW="250px">{user.age}</OneLineText>
          </Flex>
        </VStack>

        <Spacer />

        <LinkButton href={`/users/${user.uuid}`} mt="4">
          Ver perfil
        </LinkButton>
      </Flex>
    </Flex>
  );
}
