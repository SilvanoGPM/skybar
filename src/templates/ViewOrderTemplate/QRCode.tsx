import { QRCodeGenerator } from '$components/QRCodeGenerator';
import { Box, Center } from '@chakra-ui/react';

export function QRCode() {
  return (
    <Center my="4">
      <Box p="4" bg="white" rounded="md">
        <QRCodeGenerator text={window.location.href} />
      </Box>
    </Center>
  );
}
