import Head from 'next/head';

import { findOrderByUUID } from '$services/api/orders';
import { getUserPermissions } from '$utils/getUserPermissions';
import { withSSRAuth } from '$utils/withSSRAuth';

import {
  ViewOrderTemplate,
  ViewOrderTemplateProps,
} from '$templates/ViewOrderTemplate';
import { formatOrder } from '$utils/formatters';

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

export const getServerSideProps = withSSRAuth(async (ctx, session) => {
  const { uuid } = ctx.params as { uuid: string };

  try {
    const order = await findOrderByUUID(uuid);

    const { isStaff } = getUserPermissions(session.authorities.join(','));

    const isOwner = order.user.email === session.sub;

    if (!isStaff && !isOwner) {
      return { redirect: { destination: '/', permanent: false } };
    }

    const baseOrder = formatOrder(order);

    return { props: { isStaff, isOwner, baseOrder } };
  } catch (err) {
    return { notFound: true };
  }
});
