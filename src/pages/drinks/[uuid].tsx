import { GetStaticPaths, GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';

import { findDrinkByUUID, getHotAndNewDrinks } from '$services/api/drinks';
import { DrinkTemplate, DrinkTemplateProps } from '$templates/DrinkTemplate';
import { formatAmount, formatVolume } from '$utils/formatters';

export default function DrinkPage(props: DrinkTemplateProps) {
  return (
    <>
      <NextSeo
        title={`${props.drink.name} • Skybar`}
        description={props.drink.description}
        canonical="https://skybar.vercel.app/"
        openGraph={{
          images: [{ url: props.drink.picture, alt: props.drink.name }],
        }}
      />

      <DrinkTemplate {...props} />
    </>
  );
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

  const drink = {
    ...drinkRaw,
    priceFormatted: formatAmount(drinkRaw.price),
    volumeFormatted: formatVolume(drinkRaw.volume),
  };

  return { props: { drink } };
};
