import { Badge, Icon, Tooltip } from '@chakra-ui/react';
import { BsCupStraw } from 'react-icons/bs';
import { IoBeerOutline } from 'react-icons/io5';

interface AlcoholicBadgeProps {
  alcoholic: boolean;
}

export function AlcoholicBadge({ alcoholic }: AlcoholicBadgeProps) {
  if (alcoholic) {
    return (
      <Tooltip label="Esta bebida é alcoólica" bg="orange.400" color="white">
        <Badge colorScheme="orange" fontSize="2xl" variant="solid">
          <Icon as={IoBeerOutline} />
        </Badge>
      </Tooltip>
    );
  }

  return (
    <Tooltip label="Esta bebida não é alcoólica" bg="green.400" color="white">
      <Badge colorScheme="green" fontSize="2xl" variant="solid">
        <Icon as={BsCupStraw} />
      </Badge>
    </Tooltip>
  );
}
