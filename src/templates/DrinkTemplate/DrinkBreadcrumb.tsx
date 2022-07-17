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
      <BreadcrumbItem>
        <Link href="/" passHref>
          <BreadcrumbLink>Início</BreadcrumbLink>
        </Link>
      </BreadcrumbItem>

      <BreadcrumbItem>
        <Link href="/drinks" passHref>
          <BreadcrumbLink>Bebidas</BreadcrumbLink>
        </Link>
      </BreadcrumbItem>

      <BreadcrumbItem isCurrentPage>
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
