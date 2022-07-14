import { useScreenVersion } from '$hooks/useScreenVersion';
import { Avatar, Box, Flex, Text } from '@chakra-ui/react';

export function UserInfo() {
  const { isMediumVersion } = useScreenVersion();

  return (
    <Flex>
      <Avatar
        name="SkyG0D"
        src="https://github.com/SkyG0D.png"
        size={['sm', 'md', 'md']}
        borderWidth="1px"
        borderColor="brand.100"
      />

      {isMediumVersion && (
        <Box ml="4">
          <Text>Silvano</Text>
          <Text color="gray.300">silvanosilvino@hotmail.com</Text>
        </Box>
      )}
    </Flex>
  );
}
