import Head from 'next/head';

import { DrinkSearchTemplate } from '$templates/DrinkSearchTemplate';

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
