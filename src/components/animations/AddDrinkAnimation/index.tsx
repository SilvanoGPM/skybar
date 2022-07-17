import { ForwardedRef, forwardRef, useImperativeHandle } from 'react';
import { Box, useBoolean } from '@chakra-ui/react';
import Lottie from 'react-lottie';

import animation from '$/assets/lottie/add-drink.json';

export interface AddDrinkAnimationHandles {
  startAnimation: () => void;
}

function AddDrinkAnimationComponent(
  _: object,
  ref: ForwardedRef<AddDrinkAnimationHandles>,
) {
  const [animationPlaying, animationActions] = useBoolean(false);

  function startAnimation() {
    animationActions.on();

    setTimeout(() => {
      animationActions.off();
    }, 3000);
  }

  useImperativeHandle(ref, () => ({
    startAnimation,
  }));

  return (
    <Box
      pos="absolute"
      top="50%"
      left="50%"
      transition="0.2s"
      transform={`translate(-50%, -50%) scale(${animationPlaying ? '1' : '0'})`}
      zIndex="banner"
      w="40"
    >
      <Lottie
        isStopped={!animationPlaying}
        isClickToPauseDisabled={true}
        options={{
          animationData: animation,
          autoplay: true,
          loop: false,
        }}
      />
    </Box>
  );
}

export const AddDrinkAnimation = forwardRef<AddDrinkAnimationHandles>(
  AddDrinkAnimationComponent,
);
