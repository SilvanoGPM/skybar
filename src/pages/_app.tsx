import { AppProps } from 'next/app';
import Head from 'next/head';

import { AuthProvider } from '$contexts/AuthContext';

function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Head>
        <title>Next Boilerplate</title>
      </Head>

      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default App;
