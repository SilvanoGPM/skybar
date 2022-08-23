import Head from 'next/head';

import { LatestOrdersTemplate } from '$templates/LatestOrdersTemplate';
import { withSSRAuth } from '$utils/withSSRAuth';

export default function LatestOrders() {
  return (
    <>
      <Head>
        <title>Últimos pedidos • Skybar</title>
      </Head>

      <LatestOrdersTemplate />
    </>
  );
}

export const getServerSideProps = withSSRAuth(undefined, {
  roles: ['ROLE_BARMEN', 'ROLE_WAITER', 'ROLE_ADMIN'],
});
