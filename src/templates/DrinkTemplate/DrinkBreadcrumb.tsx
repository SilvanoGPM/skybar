import { FadeIn } from '$components/animations/FadeIn';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import Link from 'next/link';

interface DrinkBreadcrumbProps {
  drinkName: string;
}

export function DrinkBreadcrumb({ drinkName }: DrinkBreadcrumbProps) {
  return (
    <Breadcrumb
      mb="8"
      spacing="8px"
      fontSize={['md', 'xl', '2xl']}
      fontWeight="bold"
    >
      <BreadcrumbItem as={FadeIn} delay={1} style={{ display: 'inline-block' }}>
        <Link href="/" passHref>
          <BreadcrumbLink>Início</BreadcrumbLink>
        </Link>
      </BreadcrumbItem>

      <BreadcrumbItem
        as={FadeIn}
        delay={1.3}
        style={{ display: 'inline-block' }}
      >
        <Link href="/drinks" passHref>
          <BreadcrumbLink>Bebidas</BreadcrumbLink>
        </Link>
      </BreadcrumbItem>

      <BreadcrumbItem
        as={FadeIn}
        delay={1.6}
        style={{ display: 'inline-block' }}
        isCurrentPage
      >
        <Link href="#" passHref>
          <BreadcrumbLink
            bg="brand.100"
            py="1"
            px="4"
            rounded="xl"
            _light={{ color: 'white' }}
          >
            {drinkName}
          </BreadcrumbLink>
        </Link>
      </BreadcrumbItem>
    </Breadcrumb>
  );
}
