import { forwardRef, ForwardRefRenderFunction, Fragment } from 'react';

import {
  Button,
  IconButton,
  IconButtonProps,
  ButtonProps,
  LightMode,
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
  const Wrapper = !colorScheme ? LightMode : Fragment;

  if (!onlyIcon) {
    return (
      <Wrapper>
        <Button
          colorScheme={colorScheme ?? 'brand'}
          onClick={onClick}
          leftIcon={leftIcon}
          rightIcon={rightIcon}
          ref={ref}
          transition="0.2s filter"
          _hover={{ filter: 'brightness(0.9)' }}
          {...props}
        >
          {children ?? props['aria-label']}
        </Button>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <IconButton
        colorScheme={colorScheme ?? 'brand'}
        onClick={onClick}
        ref={ref}
        transition="0.2s filter"
        _hover={{ filter: 'brightness(0.9)' }}
        icon={props.icon || leftIcon || rightIcon}
        {...props}
      />
    </Wrapper>
  );
};

export const ResponsiveButton = forwardRef(ResponsiveButtonBase);
