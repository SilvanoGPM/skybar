import { destroyCookie, parseCookies } from 'nookies';
import decode from 'jwt-decode';

import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from 'next';

import { decodeJWE } from './decodeJWE';
import { validateUserPermisssions } from './validateUserPermissions';

interface WithSSRAuthOptions {
  roles?: string[];
}

export function withSSRAuth<P>(
  fn?: GetServerSideProps<P>,
  options?: WithSSRAuthOptions,
) {
  return async (
    ctx: GetServerSidePropsContext,
  ): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(ctx);
    const token = cookies['skybar.token'];

    if (!token) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      };
    }

    if (options) {
      const jwe = token.replace('Bearer ', '');
      const jwt = await decodeJWE(jwe);
      const user = decode<{ authorities: string[] }>(jwt);

      const userHasValidPerms = validateUserPermisssions({
        user: { role: user.authorities.join(',') },
        roles: options.roles,
      });

      if (!userHasValidPerms) {
        return {
          redirect: {
            destination: '/',
            permanent: false,
          },
        };
      }
    }

    if (!fn) {
      return {
        props: {} as P,
      };
    }

    try {
      return fn(ctx);
    } catch (err) {
      if (err) {
        destroyCookie(ctx, 'skybar.token');

        return {
          redirect: {
            destination: '/',
            permanent: false,
          },
        };
      }

      return { props: {} as P };
    }
  };
}
