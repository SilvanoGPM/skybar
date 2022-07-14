import { ReactNode } from 'react';
import { Link as ChakraLink } from '@chakra-ui/react';
import Link from 'next/link';

interface PopoverLinkProps {
  href: string;
  children: ReactNode;
}

export function PopoverLink({ href, children }: PopoverLinkProps) {
  return (
    <Link href={href} passHref>
      <ChakraLink>{children}</ChakraLink>
    </Link>
  );
}
