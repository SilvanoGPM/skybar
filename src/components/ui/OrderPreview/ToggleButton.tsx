import { As, Icon, IconButton } from '@chakra-ui/react';

interface ToggleButtonProps {
  icon: As;
  onToggle: () => void;
}

export function ToggleButton({ icon, onToggle }: ToggleButtonProps) {
  return (
    <IconButton
      aria-label="Altenar visibilidade do novo pedido"
      icon={<Icon as={icon} />}
      rounded="full"
      alignSelf="start"
      onClick={onToggle}
      pos="absolute"
      top="-5"
      left="50%"
      borderWidth="1px"
      borderColor="brand.500"
      transform="translateX(-50%)"
      _dark={{ bg: 'gray.700' }}
      _light={{ bg: 'gray.200' }}
    />
  );
}
