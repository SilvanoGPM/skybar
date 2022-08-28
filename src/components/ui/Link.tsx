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
  const color = (props.color as string) || 'purple';

  return (
    <NextLink href={href} passHref>
      <ChakraLink
        sx={{ '--color': color, ...linkHover }}
        color="brand.100"
        {...props}
      >
        <HighlightedText>{children}</HighlightedText>
      </ChakraLink>
    </NextLink>
  );
}
