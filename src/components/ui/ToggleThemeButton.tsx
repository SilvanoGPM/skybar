import {
  Icon,
  IconButton,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { BiMoon, BiSun } from 'react-icons/bi';

export function ToggleThemeButton() {
  const { toggleColorMode } = useColorMode();

  const icon = useColorModeValue(BiSun, BiMoon);

  return (
    <IconButton
      aria-label="Mudar tema"
      colorScheme="gray"
      color="inherit"
      onClick={toggleColorMode}
      icon={<Icon as={icon} />}
    />
  );
}
