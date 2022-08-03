import Head from 'next/head';

import { NotFoundTemplate } from '$templates/NotFoundTemplate';

export default function NotFound() {
  return (
    <>
      <Head>
        <title>Parece que você bebeu demais • Skybar</title>
      </Head>

      <NotFoundTemplate />
    </>
  );
}
