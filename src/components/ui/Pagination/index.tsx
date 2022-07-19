import { Box, Stack } from '@chakra-ui/react';

import { PaginationEllipsis } from './PaginationEllipsis';
import { PaginationItem } from './PaginationItem';

interface PaginationProps {
  totalCountOfRegisters: number;
  registersPerPage?: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
}

const siblingsCount = 1;

function generatePagesArray(from: number, to: number) {
  return [...new Array(to - from)]
    .map((_, index) => from + index + 1)
    .filter((page) => page > 0);
}

export function Pagination({
  totalCountOfRegisters,
  currentPage = 1,
  registersPerPage = 10,
  onPageChange,
}: PaginationProps) {
  const lastPage = Math.ceil(totalCountOfRegisters / registersPerPage);

  const previousPage =
    currentPage > 1
      ? generatePagesArray(currentPage - 1 - siblingsCount, currentPage - 1)
      : [];

  const nextPages =
    currentPage < lastPage
      ? generatePagesArray(
          currentPage,
          Math.min(currentPage + siblingsCount, lastPage),
        )
      : [];

  if (lastPage <= 1) {
    return null;
  }

  return (
    <Stack
      direction={['column', 'row']}
      mt="8"
      justify="space-between"
      align="center"
      spacing="6"
    >
      <Box>
        <strong>{(currentPage - 1) * registersPerPage}</strong> -{' '}
        <strong>
          {currentPage === lastPage
            ? totalCountOfRegisters
            : currentPage * registersPerPage}
        </strong>{' '}
        de <strong>{totalCountOfRegisters}</strong>
      </Box>

      <Stack direction="row" spacing="2">
        {currentPage > siblingsCount + 1 && (
          <>
            <PaginationItem number={1} onPageChange={onPageChange} />
            {currentPage > siblingsCount + 2 && <PaginationEllipsis />}
          </>
        )}

        {previousPage.map((page) => (
          <PaginationItem
            key={page}
            number={page}
            onPageChange={onPageChange}
          />
        ))}

        <PaginationItem
          number={currentPage}
          isCurrent
          onPageChange={onPageChange}
        />

        {nextPages.map((page) => (
          <PaginationItem
            key={page}
            number={page}
            onPageChange={onPageChange}
          />
        ))}

        {currentPage + siblingsCount < lastPage && (
          <>
            {currentPage + siblingsCount + 1 < lastPage && (
              <PaginationEllipsis />
            )}
            <PaginationItem number={lastPage} onPageChange={onPageChange} />
          </>
        )}
      </Stack>
    </Stack>
  );
}
