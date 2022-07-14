import { forwardRef, ForwardRefRenderFunction } from 'react';

import {
  Button,
  IconButton,
  IconButtonProps,
  ButtonProps,
} from '@chakra-ui/react';

type ResponsiveButtonProps = {
  onlyIcon?: boolean;
} & ButtonProps &
  IconButtonProps;

const ResponsiveButtonBase: ForwardRefRenderFunction<
  HTMLButtonElement,
  ResponsiveButtonProps
> = (
  { children, onClick, onlyIcon = false, leftIcon, rightIcon, ...props },
  ref,
) => {
  if (!onlyIcon) {
    return (
      <Button
        onClick={onClick}
        leftIcon={leftIcon}
        rightIcon={rightIcon}
        ref={ref}
        {...props}
      >
        {children ?? props['aria-label']}
      </Button>
    );
  }

  return (
    <IconButton
      onClick={onClick}
      ref={ref}
      icon={props.icon || leftIcon || rightIcon}
      {...props}
    />
  );
};

export const ResponsiveButton = forwardRef(ResponsiveButtonBase);
