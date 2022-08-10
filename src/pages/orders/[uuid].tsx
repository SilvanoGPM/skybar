import { findOrderByUUID } from '$services/api/orders';
import { getUserPermissions } from '$utils/getUserPermissions';
import { withSSRAuth } from '$utils/withSSRAuth';

import {
  ViewOrderTemplate,
  ViewOrderTemplateProps,
} from '$templates/ViewOrderTemplate';
import Head from 'next/head';

export default function ViewOrder(props: ViewOrderTemplateProps) {
  return (
    <>
      <Head>
        <title>Meu pedido • Skybar</title>
      </Head>

      <ViewOrderTemplate {...props} />
    </>
  );
}

export const getServerSideProps = withSSRAuth(async (ctx, user) => {
  const { uuid } = ctx.params as { uuid: string };

  try {
    const order = await findOrderByUUID(uuid);

    const { isStaff } = getUserPermissions(user.authorities.join(','));

    const isOwner = order.user.email === user.sub;

    if (!isStaff || !isOwner) {
      return { redirect: { destination: '/', permanent: false } };
    }

    return { props: { isStaff, isOwner, order } };
  } catch (err) {
    console.log(err);
    return { notFound: true };
  }
});
