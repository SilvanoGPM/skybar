import {
  Button,
  ButtonProps,
  LightMode,
  Link as ChakraLink,
} from '@chakra-ui/react';

import Link from 'next/link';

interface LinkButtonProps extends ButtonProps {
  href: string;
}

export function LinkButton({ href, children, ...props }: LinkButtonProps) {
  return (
    <Link href={href} passHref>
      <ChakraLink
        w={props.w ? props.w : 'full'}
        flex={props.flex}
        maxW={props.maxW}
      >
        <LightMode>
          <Button w="full" {...props}>
            {children}
          </Button>
        </LightMode>
      </ChakraLink>
    </Link>
  );
}
