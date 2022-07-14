import type { Drink as DrinkRaw } from '$services/api/drinks';
import { DefaultLayout } from '$components/ui/DefaultLayout';
import { Flex } from '@chakra-ui/react';
import { DrinkList } from '$components/DrinkList';

type Drink = { priceFormatted: string } & DrinkRaw;

export interface HomeTemplateProps {
  topDrinks: Drink[];
  latestDrinks: Drink[];
}

export function HomeTemplate({ topDrinks, latestDrinks }: HomeTemplateProps) {
  return (
    <DefaultLayout>
      <Flex w="full" h="full" direction="column" overflowX="hidden">
        <DrinkList drinks={topDrinks} title="Mais polulares" />
        <DrinkList drinks={latestDrinks} title="Mais recentes" />
      </Flex>
    </DefaultLayout>
  );
}
