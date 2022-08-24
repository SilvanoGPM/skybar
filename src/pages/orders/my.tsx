import { withSSRAuth } from '$utils/withSSRAuth';
import Head from 'next/head';

import { MyOrdersTemplate } from '$templates/MyOrdersTemplate';

export default function MyOrders() {
  return (
    <>
      <Head>
        <title>Meus pedidos • Skybar</title>
      </Head>

      <MyOrdersTemplate />
    </>
  );
}

export const getServerSideProps = withSSRAuth(undefined, {
  roles: ['ROLE_USER'],
});
