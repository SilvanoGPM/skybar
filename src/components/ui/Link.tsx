import NextLink from 'next/link';

import {
  Link as ChakraLink,
  LinkProps as ChakraLinkProps,
} from '@chakra-ui/react';

import { linkHover } from '$styles/linkHover';

import { HighlightedText } from './HighlightedText';

interface LinkProps extends ChakraLinkProps {
  href: string;
}

export function Link({ href, children, ...props }: LinkProps) {
  return (
    <NextLink href={href} passHref>
      <ChakraLink sx={linkHover} {...props}>
        <HighlightedText>{children}</HighlightedText>
      </ChakraLink>
    </NextLink>
  );
}
