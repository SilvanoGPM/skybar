import { GetStaticPaths, GetStaticProps } from 'next';

import { findDrinkByUUID, getHotAndNewDrinks } from '$services/api/drinks';
import { DrinkTemplate, DrinkTemplateProps } from '$templates/DrinkTemplate';
import { formatAmount } from '$utils/formatters';

export default function DrinkPage(props: DrinkTemplateProps) {
  return <DrinkTemplate {...props} />;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const hotAndNewDrinks = await getHotAndNewDrinks();

  const hotDrinks = hotAndNewDrinks.topDrinks.map(({ uuid }) => ({
    params: { uuid },
  }));

  const newDrinks = hotAndNewDrinks.latestDrinks.map(({ uuid }) => ({
    params: { uuid },
  }));

  const paths = [...hotDrinks, ...newDrinks];

  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { uuid } = params as { uuid: string };

  const drinkRaw = await findDrinkByUUID(uuid);

  const drink = { ...drinkRaw, priceFormatted: formatAmount(drinkRaw.price) };

  return { props: { drink } };
};
