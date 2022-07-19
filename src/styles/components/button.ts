export const Button = {
  variants: {
    solid: {
      bg: 'brand.500',
      color: 'white',
      _disabled: {
        opacity: 0.5,
        cursor: 'not-allowed',
        _hover: { filter: 'brightness(1)' },
      },
      _hover: { filter: 'brightness(0.9)' },
    },
    outline: {
      border: '2px solid',
      borderColor: 'brand.500',
      color: 'brand.500',
      _active: {
        bg: 'brand.500',
        color: 'white',
      },
    },
  },
};
