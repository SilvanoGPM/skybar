import Head from 'next/head';

import { findOrderByUUID } from '$services/api/orders';
import { getUserPermissions } from '$utils/getUserPermissions';
import { withSSRAuth } from '$utils/withSSRAuth';
import { timeSince } from '$utils/timeSince';
import { getUserAge } from '$utils/getUserAge';

import {
  ViewOrderTemplate,
  ViewOrderTemplateProps,
} from '$templates/ViewOrderTemplate';

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
    const baseOrder = await findOrderByUUID(uuid);

    const { isStaff } = getUserPermissions(session.authorities.join(','));

    const isOwner = baseOrder.user.email === session.sub;

    if (!isStaff || !isOwner) {
      return { redirect: { destination: '/', permanent: false } };
    }

    const createdAt = timeSince(new Date(baseOrder.createdAt), 'atrás');
    const updatedAt = timeSince(new Date(baseOrder.updatedAt), 'atrás');

    const user = {
      ...baseOrder.user,
      age: `${getUserAge(baseOrder.user.birthDay)} anos`,
    };

    const order = { ...baseOrder, createdAt, updatedAt, user };

    return { props: { isStaff, isOwner, order } };
  } catch (err) {
    return { notFound: true };
  }
});
