import { Box } from '@chakra-ui/react';
import Lottie from 'react-lottie';

import animation from '$/assets/lottie/add-drink-animation.json';

interface CartAnimationProps {
  animationPlaying: boolean;
}

export function AddDrinkAnimation({ animationPlaying }: CartAnimationProps) {
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
