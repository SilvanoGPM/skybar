import {
  Box,
  BoxProps,
  Flex,
  FormControl,
  FormLabel,
  Icon,
  IconButton,
  Image,
} from '@chakra-ui/react';

import { RiCameraLine } from 'react-icons/ri';
import { useFileUpload } from 'use-file-upload';

interface UploadFileProps extends BoxProps {
  label?: string;
  onFileChange?: (file: File) => void;
}

export function UploadFile({ label, onFileChange, ...props }: UploadFileProps) {
  const [file, selectFile] = useFileUpload();

  function handleClick() {
    selectFile({ accept: 'image/*', multiple: false }, ({ file }) => {
      onFileChange?.(file);
    });
  }

  return (
    <FormControl>
      {Boolean(label) && <FormLabel onClick={handleClick}>{label}</FormLabel>}

      <Flex w="full" align="center" justify="space-between">
        <Box
          rounded="md"
          overflow="hidden"
          {...props}
          pos="relative"
          p="4"
          role="group"
          _dark={{ bg: 'gray.900' }}
          _light={{ bg: 'gray.50' }}
        >
          {file && (
            <Image src={file.source} w="full" h="full" objectFit="contain" />
          )}

          <IconButton
            aria-label="Enviar arquivo"
            colorScheme="blackAlpha.100"
            icon={<Icon as={RiCameraLine} fontSize={['4xl', '5xl', '6xl']} />}
            pos="absolute"
            left="0"
            top="0"
            overflow="hidden"
            transition="0.2s background"
            h={{ base: 'full', md: 0 }}
            w={{ base: 'full', md: 0 }}
            _groupHover={{ h: 'full', w: 'full', bg: 'blackAlpha.100' }}
            onClick={handleClick}
          />
        </Box>
      </Flex>
    </FormControl>
  );
}
