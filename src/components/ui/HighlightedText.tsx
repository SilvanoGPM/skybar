import { Text, TextProps } from '@chakra-ui/react';

export function HighlightedText({ children, ...props }: TextProps) {
  return (
    <Text as="span" fontWeight="bold" color="brand.100" {...props}>
      {children}
    </Text>
  );
}
