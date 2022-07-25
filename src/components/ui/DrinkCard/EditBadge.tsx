import { Badge, Center, Icon, Tooltip } from '@chakra-ui/react';
import Link from 'next/link';
import { RiPencilFill } from 'react-icons/ri';

interface EditBadgeProps {
  uuid: string;
}

export function EditBadge({ uuid }: EditBadgeProps) {
  return (
    <Link href={`/drinks/edit/${uuid}`}>
      <a>
        <Tooltip label="Editar bebida" bg="blue.300" color="white" hasArrow>
          <Badge bg="blue.300" color="white" w="6" h="6" rounded="full">
            <Center data-testid="edit-badge" h="full">
              <Icon as={RiPencilFill} />
            </Center>
          </Badge>
        </Tooltip>
      </a>
    </Link>
  );
}
