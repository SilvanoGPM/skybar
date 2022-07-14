import { Avatar, Box, Flex } from '@chakra-ui/react';

import { useScreenVersion } from '$hooks/useScreenVersion';
import { useAuth } from '$contexts/AuthContext';
import { getFirstString } from '$utils/getFirstString';

import { UserInfoPopover } from './UserInfoPopover';
import { OneLineText } from '../OneLineText';

export function UserInfo() {
  const { user } = useAuth();
  const { isMediumVersion } = useScreenVersion();

  return (
    <UserInfoPopover>
      <Flex>
        <Avatar
          name={user?.name}
          src={user?.image}
          size={['sm', 'md', 'md']}
          borderWidth="1px"
          borderColor="brand.100"
        />

        {isMediumVersion && (
          <Box ml="4" textAlign="left">
            <OneLineText maxW="150px">{getFirstString(user?.name)}</OneLineText>
            <OneLineText color="gray.300" maxW="150px">
              {user?.email}
            </OneLineText>
          </Box>
        )}
      </Flex>
    </UserInfoPopover>
  );
}
