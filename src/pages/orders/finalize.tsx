import Head from 'next/head';

import { FinalizeOrderTemplate } from '$templates/FinalizeOrderTemplate';
import { withSSRAuth } from '$utils/withSSRAuth';

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

export const getServerSideProps = withSSRAuth(undefined, {
  roles: ['ROLE_USER'],
});
