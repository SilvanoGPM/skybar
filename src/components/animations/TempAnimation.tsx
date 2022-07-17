import { ForwardedRef, forwardRef, useImperativeHandle } from 'react';
import { Center, CenterProps, useBoolean } from '@chakra-ui/react';
import Lottie from 'react-lottie';

interface TempAnimationProps {
  animation: unknown;
  speed?: number;
  containerStyle?: CenterProps;
  onAnimationEnd?: () => void;
}

export interface TempAnimationHandles {
  startAnimation: () => void;
}

function TempAnimationComponent(
  { animation, speed = 1, onAnimationEnd, containerStyle }: TempAnimationProps,
  ref: ForwardedRef<TempAnimationHandles>,
) {
  const [animationPlaying, animationActions] = useBoolean(false);

  function startAnimation() {
    if (!animationPlaying) {
      animationActions.on();
    }
  }

  function handleAnimationEnd() {
    animationActions.off();
    onAnimationEnd?.();
  }

  useImperativeHandle(ref, () => ({
    startAnimation,
  }));

  const { transform, ...containerProps } = containerStyle || { transform: '' };

  return (
    <Center
      pos={animationPlaying ? 'static' : 'absolute'}
      transition="0.2s transform"
      transform={`scale(${animationPlaying ? '1' : '0'})${
        transform ? `, ${transform}` : ''
      }`}
      w="40"
      mx="auto"
      {...containerProps}
    >
      <Lottie
        isStopped={!animationPlaying}
        eventListeners={[
          { eventName: 'complete', callback: handleAnimationEnd },
        ]}
        isClickToPauseDisabled
        speed={speed}
        options={{
          animationData: animation,
          loop: false,
          autoplay: false,
        }}
      />
    </Center>
  );
}

export const TempAnimation = forwardRef<
  TempAnimationHandles,
  TempAnimationProps
>(TempAnimationComponent);
