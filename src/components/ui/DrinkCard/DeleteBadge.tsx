import {
  Badge,
  Button,
  Center,
  HStack,
  Icon,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  Spinner,
  useDisclosure,
} from '@chakra-ui/react';

import { BiTrash } from 'react-icons/bi';
import { HighlightedText } from '../HighlightedText';

interface DeleteBadgeProps {
  name: string;
  uuid: string;
  isDeleting?: boolean;
  onDelete?: (uuid: string) => void;
}

export function DeleteBadge({
  name,
  uuid,
  isDeleting,
  onDelete,
}: DeleteBadgeProps) {
  const disclosure = useDisclosure();

  function handleDelete() {
    disclosure.onClose();
    onDelete?.(uuid);
  }

  if (isDeleting) {
    return <Spinner color="red.300" size="sm" />;
  }

  return (
    <Popover placement="top" {...disclosure}>
      <PopoverTrigger>
        <Button variant="unstyled" w="6" h="6" p="none">
          <Badge bg="red.300" color="white" w="6" h="6" rounded="full">
            <Center h="full">
              <Icon as={BiTrash} />
            </Center>
          </Badge>
        </Button>
      </PopoverTrigger>

      <Portal>
        <PopoverContent _dark={{ bg: 'gray.900' }} _light={{ bg: 'gray.50' }}>
          <PopoverHeader>Remover bebida</PopoverHeader>

          <PopoverBody>
            Você tem certeza que deseja remover a bebida{' '}
            <HighlightedText>{name}</HighlightedText>?
          </PopoverBody>

          <PopoverFooter>
            <HStack align="center" justify="end">
              <Button variant="outline" onClick={disclosure.onClose}>
                Não
              </Button>

              <Button
                colorScheme="red"
                bg="red"
                color="white"
                onClick={handleDelete}
              >
                Sim
              </Button>
            </HStack>
          </PopoverFooter>
        </PopoverContent>
      </Portal>
    </Popover>
  );
}
