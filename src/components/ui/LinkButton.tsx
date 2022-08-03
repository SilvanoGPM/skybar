import { Button, ButtonProps, LightMode } from '@chakra-ui/react';
import Link from 'next/link';

interface LinkButtonProps extends ButtonProps {
  href: string;
}

export function LinkButton({ href, children, ...props }: LinkButtonProps) {
  return (
    <Link href={href}>
      <a>
        <LightMode>
          <Button w="full" {...props}>
            {children}
          </Button>
        </LightMode>
      </a>
    </Link>
  );
}
