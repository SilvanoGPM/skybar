import { GetStaticProps } from 'next';
import { Box, Heading, HStack } from '@chakra-ui/react';

import { DefaultLayout } from '$components/ui/DefaultLayout';
import { Drink as DrinkRaw, getTopDrinksMapped } from '$services/api/drinks';
import { DrinkCard } from '$components/DrinkCard';
import { formatAmount } from '$utils/formatters';

type Drink = { price: string } & Omit<DrinkRaw, 'price'>;

interface HomeProps {
  topDrinks: Drink[];
}

export default function Home({ topDrinks }: HomeProps) {
  return (
    <DefaultLayout>
      <Box>
        <Heading mb="4">Bebidas mais pedidas</Heading>

        <HStack spacing="4" overflow="auto">
          {topDrinks.map((drink) => (
            <DrinkCard key={drink.uuid} drink={drink} />
          ))}
        </HStack>
      </Box>
    </DefaultLayout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const topDrinksRaw = await getTopDrinksMapped();

  const topDrinks = topDrinksRaw.map((drink) => ({
    ...drink,
    price: formatAmount(drink.price),
  }));

  return { props: { topDrinks } };
};
