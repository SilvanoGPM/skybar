import { destroyCookie, parseCookies } from 'nookies';

import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';

import { validateUserPermisssions } from './validateUserPermissions';
import { createUserWithToken, DecodedUser } from './createUserWithToken';

interface WithSSRAuthOptions {
  roles?: string[];
}

type CallbackType<P> = (
  ctx: GetServerSidePropsContext,
  user: DecodedUser,
) => Promise<GetServerSidePropsResult<P>>;

export function withSSRAuth<P>(
  fn?: CallbackType<P>,
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

    const user = await createUserWithToken(token);

    if (options) {
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
      return fn(ctx, user);
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
