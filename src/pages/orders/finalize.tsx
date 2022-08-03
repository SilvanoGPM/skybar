import Head from 'next/head';

import { FinalizeOrderTemplate } from '$templates/FinalizeOrderTemplate';

export default function FinalizeOrder() {
  return (
    <>
      <Head>
        <title>Finalizar pedido • Skybar</title>
      </Head>

      <FinalizeOrderTemplate />
    </>
  );
}
