import { Box, Heading, HStack } from '@chakra-ui/react';
import ScrollContainer from 'react-indiana-drag-scroll';
import { motion, useAnimation } from 'framer-motion';

import { DrinkCard } from './DrinkCard';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import { thinScrollbar } from '$styles/thinScrollbar';

interface DrinkListProps {
  drinks: Array<{
    uuid: string;
    name: string;
    picture: string;
    price: number;
    priceFormatted: string;
  }>;
  title: string;
}

export function DrinkList({ drinks, title }: DrinkListProps) {
  const titleControl = useAnimation();
  const cardsControl = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.5 });

  useEffect(() => {
    if (inView) {
      titleControl.start({ x: 0, opacity: 1 });
      cardsControl.start({ y: 0, opacity: 1, skew: '0deg' });
    }
  }, [cardsControl, titleControl, inView]);

  return (
    <Box
      rounded="xl"
      p={['4', '4', '8']}
      mb="8"
      _dark={{ bg: 'gray.800', color: 'gray.50' }}
      _light={{ bg: 'gray.100', color: 'gray.900' }}
    >
      <motion.div animate={titleControl} initial={{ x: 100, opacity: 0 }}>
        <Heading as="h2" mb="6">
          {title}
        </Heading>
      </motion.div>

      <div ref={ref} />

      <HStack
        py="4"
        spacing={4}
        sx={thinScrollbar}
        as={ScrollContainer}
        hideScrollbars={false}
      >
        {drinks.map((drink, i) => (
          <motion.div
            key={drink.uuid}
            animate={cardsControl}
            transition={{ delay: i * 0.15 }}
            initial={{ y: 100, opacity: 0, skew: '-10deg' }}
          >
            <DrinkCard drink={drink} />
          </motion.div>
        ))}
      </HStack>
    </Box>
  );
}
