import { DrinkSearchTemplate } from '$templates/DrinkSearchTemplate';
import Head from 'next/head';

export default function DrinkSearch() {
  return (
    <>
      <Head>
        <title>Bebidas • Skybar</title>
      </Head>

      <DrinkSearchTemplate />
    </>
  );
}
