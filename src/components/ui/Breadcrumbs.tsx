import { FadeIn } from '$components/animation/FadeIn';
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbProps,
} from '@chakra-ui/react';
import Link from 'next/link';

interface BreadcrumbsProps extends BreadcrumbProps {
  items: Array<{ href: string; label: string }>;
}

export function Breadcrumbs({ items, ...props }: BreadcrumbsProps) {
  return (
    <Box>
      <Breadcrumb
        mb="8"
        spacing="8px"
        fontSize={['x-small', 'sm', 'xl', '2xl']}
        fontWeight="bold"
        {...props}
      >
        {items.map((item, index) => {
          const isCurrentPage = index === items.length - 1;

          const linkProps = isCurrentPage
            ? {
                bg: 'brand.100',
                py: '1',
                px: '4',
                rounded: 'xl',
                _light: { color: 'white' },
                'data-testid': 'current-page',
              }
            : {};

          return (
            <BreadcrumbItem
              key={`${item.href} - ${item.label}`}
              as={FadeIn}
              delay={1 + index * 0.3}
              style={{ display: 'inline-block' }}
            >
              <Link href={item.href} passHref>
                <BreadcrumbLink {...linkProps} isCurrentPage={isCurrentPage}>
                  {item.label}
                </BreadcrumbLink>
              </Link>
            </BreadcrumbItem>
          );
        })}
      </Breadcrumb>
    </Box>
  );
}
