import { useBreakpointValue } from '@chakra-ui/react';

export const SCREENS_VERSIONS = {
  BASE: 0,
  SMALL: 1,
  MEDIUM: 2,
  LARGE: 3,
};

export function useScreenVersion() {
  const screen =
    useBreakpointValue({
      base: SCREENS_VERSIONS.BASE,
      sm: SCREENS_VERSIONS.SMALL,
      md: SCREENS_VERSIONS.MEDIUM,
      lg: SCREENS_VERSIONS.LARGE,
    }) || SCREENS_VERSIONS.BASE;

  const isBaseVersion = screen >= SCREENS_VERSIONS.BASE;
  const isSmallVersion = screen >= SCREENS_VERSIONS.SMALL;
  const isMediumVersion = screen >= SCREENS_VERSIONS.MEDIUM;
  const isLargeVersion = screen >= SCREENS_VERSIONS.LARGE;

  return {
    isBaseVersion,
    isSmallVersion,
    isMediumVersion,
    isLargeVersion,
  };
}
