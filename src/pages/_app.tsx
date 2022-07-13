import Head from 'next/head';
import { AppProps } from 'next/app';
import { StompSessionProvider } from 'react-stomp-hooks';
import { StompSessionProviderProps } from 'react-stomp-hooks/dist/interfaces/StompSessionProviderProps';
import { parseCookies } from 'nookies';
import { Fragment } from 'react';

import { AuthProvider } from '$contexts/AuthContext';
import { baseURL } from '$services/httpClient';

const SOCKET_URL = `${baseURL}/sky-drinks`;

function App({ Component, pageProps }: AppProps) {
  const { 'skybar.token': token } = parseCookies();

  const isAuthenticated = Boolean(token);

  const Wrapper = isAuthenticated ? StompSessionProvider : Fragment;

  const options = {
    ...(isAuthenticated
      ? {
          connectHeaders: { Authorization: token },
          url: SOCKET_URL,
        }
      : {}),
  } as StompSessionProviderProps;

  return (
    <Wrapper {...options}>
      <AuthProvider>
        <Head>
          <title>Next Boilerplate</title>
        </Head>

        <Component {...pageProps} />
      </AuthProvider>
    </Wrapper>
  );
}

export default App;
