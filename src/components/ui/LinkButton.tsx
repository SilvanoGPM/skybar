import {
  Button,
  ButtonProps,
  DarkMode,
  LightMode,
  Link as ChakraLink,
} from '@chakra-ui/react';

import Link from 'next/link';
import { Fragment } from 'react';

interface LinkButtonProps extends ButtonProps {
  href: string;
  mode?: 'light' | 'dark' | 'off';
}

const wrappers = {
  light: LightMode,
  dark: DarkMode,
  off: Fragment,
};

export function LinkButton({
  href,
  mode = 'light',
  children,
  ...props
}: LinkButtonProps) {
  const ButtonWrapper = wrappers[mode];

  return (
    <Link href={href} passHref>
      <ChakraLink
        w={props.w ? props.w : 'full'}
        flex={props.flex}
        maxW={props.maxW}
      >
        <ButtonWrapper>
          <Button w="full" {...props}>
            {children}
          </Button>
        </ButtonWrapper>
      </ChakraLink>
    </Link>
  );
}
