import Head from 'next/head';

import { SearchOrdersTemplate } from '$templates/SearchOrdersTemplate';
import { withSSRAuth } from '$utils/withSSRAuth';

export default function SearchOrders() {
  return (
    <>
      <Head>
        <title>Pesquisar pedidos • Skybar</title>
      </Head>

      <SearchOrdersTemplate />
    </>
  );
}

export const getServerSideProps = withSSRAuth(undefined, {
  roles: ['ROLE_BARMEN', 'ROLE_WAITER', 'ROLE_ADMIN'],
});
