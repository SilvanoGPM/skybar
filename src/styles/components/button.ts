import { ComponentStyleConfig } from '@chakra-ui/react';

export const Button: ComponentStyleConfig = {
  defaultProps: {
    colorScheme: 'brand',
  },

  variants: {
    solid: ({ colorScheme }) => ({
      color: colorScheme === 'brand' ? 'white' : 'inherit',
      transition: '0.2s filter',
      _disabled: {
        opacity: 0.5,
        bg: `${colorScheme}.500`,
        _hover: { filter: 'brightness(1)' },
      },
      _hover: { filter: 'brightness(0.9)' },
    }),

    outline: ({ colorScheme }) => ({
      border: '2px solid',
      borderColor: `${colorScheme}.500`,
      color: `${colorScheme}.500`,
      transition: '0.2s filter',
      bg: 'transparent',
      _active: {
        color: 'white',
        bg: `${colorScheme}.500`,
      },
    }),
  },
};
