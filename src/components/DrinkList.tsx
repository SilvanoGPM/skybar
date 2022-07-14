import { Heading, HStack } from '@chakra-ui/react';
import ScrollContainer from 'react-indiana-drag-scroll';

import { DrinkCard } from './DrinkCard';

interface DrinkListProps {
  drinks: Array<{
    uuid: string;
    name: string;
    picture: string;
    price: number;
    priceFormatted: string;
  }>;
  title: string;
}

export function DrinkList({ drinks, title }: DrinkListProps) {
  return (
    <>
      <Heading as="h2" mb="6">
        {title}
      </Heading>
      <ScrollContainer
        innerRef={(ref) => {
          if (ref) {
            ref.tabIndex = -1;
          }
        }}
      >
        <HStack py="4" mb="12" spacing={4}>
          {drinks.map((drink) => (
            <DrinkCard key={drink.uuid} drink={drink} />
          ))}
        </HStack>
      </ScrollContainer>
    </>
  );
}
