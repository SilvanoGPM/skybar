import {
  Button as ChakraButton,
  ButtonProps as ChakraButtonProps,
  LightMode,
} from '@chakra-ui/react';

export function Button({ children, ...props }: ChakraButtonProps) {
  return (
    <LightMode>
      <ChakraButton
        colorScheme="brand"
        transition="0.2s filter"
        _disabled={{
          opacity: 0.5,
          cursor: 'not-allowed',
          _hover: { filter: 'brightness(1)' },
        }}
        _hover={{ filter: 'brightness(0.9)' }}
        {...props}
      >
        {children}
      </ChakraButton>
    </LightMode>
  );
}
