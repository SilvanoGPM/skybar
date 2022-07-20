import { GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';

import { getLatestDrinks, getTopDrinksMapped } from '$services/api/drinks';
import { formatDrinks } from '$utils/formatters';
import { HomeTemplate, HomeTemplateProps } from '$templates/HomeTemplate';

export default function Home(props: HomeTemplateProps) {
  return (
    <>
      <NextSeo
        title="Skybar"
        description="Experimente as melhores bebidas da região"
        canonical="https://skybar.vercel.app/"
        openGraph={{
          images: [
            {
              url: 'https://skybar.vercel.app/images/banner.png',
              width: 1280,
              height: 720,
              alt: 'Skybar',
            },
          ],
        }}
      />

      <HomeTemplate {...props} />
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const topDrinksRaw = await getTopDrinksMapped();
  const latestDrinksRaw = await getLatestDrinks();

  const topDrinks = formatDrinks(topDrinksRaw);
  const latestDrinks = formatDrinks(latestDrinksRaw);

  return {
    props: { topDrinks, latestDrinks },
    revalidate: 60 * 60 * 2, // 2 hours,
  };
};
