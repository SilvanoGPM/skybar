import Head from 'next/head';

import {
  EditDrinkTemplate,
  EditDrinkTemplateProps,
} from '$templates/EditDrinkTemplate';
import { withSSRAuth } from '$utils/withSSRAuth';
import { findDrinkByUUID } from '$services/api/drinks';

export default function EditDrink(props: EditDrinkTemplateProps) {
  return (
    <>
      <Head>
        <title>Atualizar bebida • Skybar</title>
      </Head>

      <EditDrinkTemplate {...props} />
    </>
  );
}

export const getServerSideProps = withSSRAuth(
  async ({ params }) => {
    const { uuid } = params as { uuid: string };

    const drinkRaw = await findDrinkByUUID(uuid);

    const drink = {
      ...drinkRaw,
      additional: drinkRaw.additionalList.map((item) => ({
        value: item,
        label: item,
      })),
    };

    return { props: { drink } };
  },
  {
    roles: ['ROLE_BARMEN', 'ROLE_WAITER', 'ROLE_ADMIN'],
  },
);
