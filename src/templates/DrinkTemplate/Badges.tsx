import {
  Badge,
  Box,
  HStack,
  LightMode,
  Tooltip,
  VStack,
} from '@chakra-ui/react';

import { useDrinksStatus } from '$hooks/api/useDrinksStatus';

import { HotBadge } from './HotBadge';
import { NewBadge } from './NewBadge';
import { AlcoholicBadge } from './AlcoholicBadge';

interface BadgesProps {
  drink: { additionalList: string[]; uuid: string; alcoholic: boolean };
}

export function Badges({ drink }: BadgesProps) {
  const { isHot, isNew } = useDrinksStatus(drink.uuid);

  return (
    <VStack pos="absolute" top="4" right="4" align="right">
      <Box textAlign="right">
        <AlcoholicBadge alcoholic={drink.alcoholic} />
      </Box>

      <HStack justify="right">
        <LightMode>
          {isNew && <NewBadge />}
          {isHot && <HotBadge />}
        </LightMode>
      </HStack>

      <Tooltip label="Adicionais" bg="brand.100" color="white">
        <HStack justify="right">
          {drink.additionalList.map((additional) => (
            <Badge key={additional} bg="brand.100" color="white" fontSize="md">
              {additional}
            </Badge>
          ))}
        </HStack>
      </Tooltip>
    </VStack>
  );
}
