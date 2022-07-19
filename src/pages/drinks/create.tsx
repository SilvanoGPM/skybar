import { CreateDrinkTemplate } from '$templates/CreateDrinkTemplate';
import { withSSRAuth } from '$utils/withSSRAuth';
import Head from 'next/head';

export default function CreateDrink() {
  return (
    <>
      <Head>
        <title>Adicionar bebida • Skybar</title>
      </Head>

      <CreateDrinkTemplate />
    </>
  );
}

export const getServerSideProps = withSSRAuth(undefined, {
  roles: ['ROLE_BARMEN', 'ROLE_WAITER', 'ROLE_ADMIN'],
});
