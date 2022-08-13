import { Badge, Button, Center, Icon, Spinner } from '@chakra-ui/react';
import { useRef } from 'react';
import { BiTrash } from 'react-icons/bi';

import { ConfirmPopover, ConfirmPopoverHandles } from '../ConfirmPopover';
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
  const popoverRef = useRef<ConfirmPopoverHandles>();

  function handleDelete() {
    popoverRef?.current?.disclosure.onClose?.();
    onDelete?.(uuid);
  }

  if (isDeleting) {
    return <Spinner color="red.300" size="sm" />;
  }

  return (
    <ConfirmPopover
      header="Remover bebida"
      body={
        <>
          Você tem certeza que deseja remover a bebida{' '}
          <HighlightedText>{name}</HighlightedText>?
        </>
      }
      onFinish={handleDelete}
      successButtonProps={{ 'data-testid': 'delete-button' }}
    >
      <Button variant="unstyled" w="6" h="6" p="none">
        <Badge bg="red.300" color="white" w="6" h="6" rounded="full">
          <Center data-testid="delete-badge" h="full">
            <Icon as={BiTrash} />
          </Center>
        </Badge>
      </Button>
    </ConfirmPopover>
  );
}
