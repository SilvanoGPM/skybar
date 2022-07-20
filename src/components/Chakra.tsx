import { GetServerSideProps } from 'next';
import { ReactNode } from 'react';

import {
  ChakraProvider,
  ChakraProviderProps,
  cookieStorageManagerSSR,
  localStorageManager,
} from '@chakra-ui/react';

interface ChakraProps extends ChakraProviderProps {
  children: ReactNode;
  cookies: any; //eslint-disable-line
}

export function Chakra({ cookies, children, ...props }: ChakraProps) {
  const colorModeManager =
    typeof cookies === 'string'
      ? cookieStorageManagerSSR(cookies)
      : localStorageManager;

  return (
    <ChakraProvider colorModeManager={colorModeManager} {...props}>
      {children}
    </ChakraProvider>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  return {
    props: {
      cookies: req.headers.cookie ?? '',
    },
  };
};
