import { Box, Image } from '@chakra-ui/react';

import { FadeIn } from '$components/animations/FadeIn';
import animation from '$/assets/lottie/add-drink.json';

import {
  TempAnimation,
  TempAnimationHandles,
} from '$components/animations/TempAnimation';

import { Drink } from '.';
import { Badges } from './Badges';
import { RefObject } from 'react';

interface DrinkPictureProps {
  drink: Drink;
  animationRef: RefObject<TempAnimationHandles>;
}

export function DrinkPicture({ drink, animationRef }: DrinkPictureProps) {
  return (
    <FadeIn x={-100} style={{ flex: 1, display: 'flex' }}>
      <Box
        maxW={{ base: 'full', lg: '480px' }}
        maxH={{ base: '320px', lg: '480px' }}
        mb={{ base: '4', lg: '0' }}
        flex="1"
        pos="relative"
        roundedLeft="xl"
        roundedRight={{ base: 'xl', lg: 'none' }}
        overflow="hidden"
      >
        <Image
          w="full"
          h="full"
          objectFit="cover"
          src={drink.picture}
          alt={drink.name}
        />

        <Badges drink={drink} />

        <TempAnimation
          animation={animation}
          ref={animationRef}
          speed={2}
          containerStyle={{
            pos: 'absolute',
            top: '0',
            left: '0',
            zIndex: 'banner',
            w: 'full',
            h: 'full',
          }}
        />
      </Box>
    </FadeIn>
  );
}
