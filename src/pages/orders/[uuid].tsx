import Head from 'next/head';

import { findOrderByUUID } from '$services/api/orders';
import { getUserPermissions } from '$utils/getUserPermissions';
import { withSSRAuth } from '$utils/withSSRAuth';
import { timeSince } from '$utils/timeSince';
import { getUserAge } from '$utils/getUserAge';
import { groupDrinks } from '$contexts/OrdersContext/getItemsInOrder';

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
    const order = await findOrderByUUID(uuid);

    const { isStaff } = getUserPermissions(session.authorities.join(','));

    const isOwner = order.user.email === session.sub;

    if (!isStaff && !isOwner) {
      return { redirect: { destination: '/', permanent: false } };
    }

    const createdAt = timeSince(new Date(order.createdAt), 'atrás');
    const updatedAt = timeSince(new Date(order.updatedAt), 'atrás');

    const user = {
      ...order.user,
      age: `${getUserAge(order.user.birthDay)} anos`,
    };

    const drinks = groupDrinks(order);

    const baseOrder = { ...order, createdAt, updatedAt, user, drinks };

    return { props: { isStaff, isOwner, baseOrder } };
  } catch (err) {
    return { notFound: true };
  }
});
