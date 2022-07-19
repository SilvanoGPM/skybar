import Head from 'next/head';

import { withSSRGuest } from '$utils/withSSRGuest';
import { LoginTemplate } from '$templates/LoginTemplate';

export default function Login() {
  return (
    <>
      <Head>
        <title>Login • Skybar</title>
      </Head>

      <LoginTemplate />
    </>
  );
}

export const getServerSideProps = withSSRGuest();
