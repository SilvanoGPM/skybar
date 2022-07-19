import { Flex } from '@chakra-ui/react';

import type { Drink as DrinkRaw } from '$services/api/drinks';
import { DefaultLayout } from '$components/ui/DefaultLayout';
import { DrinkList } from '$components/ui/DrinkList';

import { Introduction } from './Introduction';

type Drink = { priceFormatted: string } & DrinkRaw;

export interface HomeTemplateProps {
  topDrinks: Drink[];
  latestDrinks: Drink[];
}

export function HomeTemplate({ topDrinks, latestDrinks }: HomeTemplateProps) {
  return (
    <DefaultLayout>
      <Flex w="full" h="full" direction="column" overflowX="hidden">
        <Introduction />

        <DrinkList
          drinks={topDrinks}
          title="Mais polulares"
          empty={{ title: 'Sem bebidas populares' }}
        />

        <DrinkList
          drinks={latestDrinks}
          title="Mais recentes"
          empty={{ title: 'Sem bebidas recentes' }}
        />
      </Flex>
    </DefaultLayout>
  );
}
