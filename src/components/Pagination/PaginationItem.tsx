import { Button } from '@chakra-ui/react';

interface PaginationItemProps {
  onPageChange: (page: number) => void;
  number: number;
  isCurrent?: boolean;
}

export function PaginationItem({
  onPageChange,
  number,
  isCurrent = false,
}: PaginationItemProps) {
  if (isCurrent) {
    return (
      <Button
        size="sm"
        fontSize="xs"
        width="4"
        colorScheme="brand"
        disabled
        color="white"
        _disabled={{ bg: 'brand.500', cursor: 'default' }}
      >
        {number}
      </Button>
    );
  }

  return (
    <Button
      onClick={() => onPageChange(number)}
      size="sm"
      fontSize="xs"
      width="4"
      color="inherit"
      _dark={{ bg: 'gray.700', _hover: { bg: 'gray.500' } }}
      _light={{ bg: 'gray.200', _hover: { bg: 'gray.300' } }}
    >
      {number}
    </Button>
  );
}
