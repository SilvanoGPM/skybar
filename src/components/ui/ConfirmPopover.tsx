import { Fragment, ReactNode } from 'react';

import {
  Button,
  ButtonProps,
  DarkMode,
  HStack,
  LightMode,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  useDisclosure,
} from '@chakra-ui/react';

interface ConfirmPopoverProps {
  children: ReactNode;
  header: ReactNode;
  body: ReactNode;
  onFinish: () => void;
  cancelButtonMessage?: string;
  successButtonMessage?: string;
  cancelButtonProps?: ButtonProps;
  successButtonProps?: ButtonProps;
  triggerTheme?: 'light' | 'dark' | 'off';
}

const themes = {
  off: Fragment,
  light: LightMode,
  dark: DarkMode,
};

export function ConfirmPopover({
  children,
  header,
  body,
  onFinish,
  successButtonProps,
  successButtonMessage = 'Sim',
  cancelButtonProps,
  cancelButtonMessage = 'Não',
  triggerTheme = 'light',
}: ConfirmPopoverProps) {
  const disclosure = useDisclosure();

  const TriggerTheme = themes[triggerTheme];

  return (
    <Popover {...disclosure}>
      <TriggerTheme>
        <PopoverTrigger>{children}</PopoverTrigger>
      </TriggerTheme>

      <Portal>
        <PopoverContent>
          <PopoverHeader
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            {header}
            <PopoverCloseButton pos="static" />
          </PopoverHeader>

          <PopoverBody>{body}</PopoverBody>

          <PopoverFooter>
            <HStack justify="end">
              <Button onClick={disclosure.onClose} {...cancelButtonProps}>
                {cancelButtonMessage}
              </Button>

              <Button onClick={onFinish} {...successButtonProps}>
                {successButtonMessage}
              </Button>
            </HStack>
          </PopoverFooter>
        </PopoverContent>
      </Portal>
    </Popover>
  );
}
