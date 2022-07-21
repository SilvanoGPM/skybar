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
  {
    children,
    onClick,
    onlyIcon = false,
    colorScheme,
    leftIcon,
    rightIcon,
    ...props
  },
  ref,
) => {
  if (!onlyIcon) {
    return (
      <Button
        colorScheme={colorScheme ?? 'brand'}
        onClick={onClick}
        leftIcon={leftIcon}
        rightIcon={rightIcon}
        ref={ref}
        transition="0.2s filter"
        _hover={{ filter: 'brightness(0.9)' }}
        data-testid="button"
        {...props}
      >
        {children ?? props['aria-label']}
      </Button>
    );
  }

  return (
    <IconButton
      colorScheme={colorScheme ?? 'brand'}
      onClick={onClick}
      ref={ref}
      transition="0.2s filter"
      _hover={{ filter: 'brightness(0.9)' }}
      icon={props.icon || leftIcon || rightIcon}
      data-testid="icon-button"
      {...props}
    />
  );
};

export const ResponsiveButton = forwardRef(ResponsiveButtonBase);
