import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from 'next';

import { parseCookies } from 'nookies';

export function withSSRGuest<P>(fn?: GetServerSideProps<P>) {
  return async (
    ctx: GetServerSidePropsContext,
  ): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(ctx);

    if (cookies['skybar.token']) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }

    if (!fn) {
      return {
        props: {} as P,
      };
    }

    return fn(ctx);
  };
}
