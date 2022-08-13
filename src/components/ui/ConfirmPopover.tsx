import {
  ForwardedRef,
  forwardRef,
  Fragment,
  ReactNode,
  useImperativeHandle,
} from 'react';

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
  PopoverContentProps,
  PopoverFooter,
  PopoverHeader,
  PopoverProps,
  PopoverTrigger,
  Portal,
  StackProps,
  useDisclosure,
  UseDisclosureProps,
} from '@chakra-ui/react';

interface ConfirmPopoverProps {
  children: ReactNode;
  header: ReactNode;
  body?: ReactNode;
  onFinish: (disclosure: UseDisclosureProps) => void;
  popoverProps?: PopoverProps;
  popoverContentProps?: PopoverContentProps;
  footerProps?: StackProps;
  cancelButtonMessage?: string;
  successButtonMessage?: string;
  cancelButtonProps?: ButtonProps & { 'data-testid': string };
  successButtonProps?: ButtonProps & { 'data-testid': string };
  triggerTheme?: 'light' | 'dark' | 'off';
  usePortal?: boolean;
}

export interface ConfirmPopoverHandles {
  disclosure: UseDisclosureProps;
}

const themes = {
  off: Fragment,
  light: LightMode,
  dark: DarkMode,
};

function ConfirmPopoverComponent(
  {
    children,
    header,
    body,
    onFinish,
    popoverProps,
    popoverContentProps,
    footerProps,
    successButtonProps,
    successButtonMessage = 'Sim',
    cancelButtonProps,
    cancelButtonMessage = 'Não',
    triggerTheme = 'light',
    usePortal = true,
  }: ConfirmPopoverProps,
  ref: ForwardedRef<ConfirmPopoverHandles>,
) {
  const disclosure = useDisclosure();

  const TriggerTheme = themes[triggerTheme];
  const PortalComponent = usePortal ? Portal : Fragment;

  useImperativeHandle(ref, () => ({ disclosure }));

  return (
    <Popover {...disclosure} {...popoverProps}>
      <TriggerTheme>
        <PopoverTrigger>{children}</PopoverTrigger>
      </TriggerTheme>

      <PortalComponent>
        <PopoverContent {...popoverContentProps}>
          <PopoverHeader
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            {header}
            <PopoverCloseButton pos="static" />
          </PopoverHeader>

          {body && <PopoverBody>{body}</PopoverBody>}

          <PopoverFooter {...footerProps}>
            <HStack justify="end">
              <Button onClick={disclosure.onClose} {...cancelButtonProps}>
                {cancelButtonMessage}
              </Button>

              <Button
                onClick={() => onFinish(disclosure)}
                {...successButtonProps}
              >
                {successButtonMessage}
              </Button>
            </HStack>
          </PopoverFooter>
        </PopoverContent>
      </PortalComponent>
    </Popover>
  );
}

export const ConfirmPopover = forwardRef<
  ConfirmPopoverHandles,
  ConfirmPopoverProps
>(ConfirmPopoverComponent);
