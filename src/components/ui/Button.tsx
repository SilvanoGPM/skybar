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
        _hover={{ filter: 'brightness(0.9)' }}
        {...props}
      >
        {children}
      </ChakraButton>
    </LightMode>
  );
}
