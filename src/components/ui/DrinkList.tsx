import { Box, Heading, HStack } from '@chakra-ui/react';
import ScrollContainer from 'react-indiana-drag-scroll';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';

import { DrinkCard } from './DrinkCard';
import { Empty } from './Empty';

interface DrinkListProps {
  drinks: Array<{
    uuid: string;
    name: string;
    picture: string;
    price: number;
    alcoholic: boolean;
    priceFormatted: string;
  }>;
  title: string;
  empty: { title: string; message?: string };
}

const DELAY_STEP = 0.175;

export function DrinkList({ drinks, empty, title }: DrinkListProps) {
  const titleControl = useAnimation();
  const cardsControl = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.5 });

  useEffect(() => {
    if (inView) {
      titleControl.start({ x: 0, opacity: 1 });
      cardsControl.start({ y: 0, opacity: 1 });
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

      {drinks.length ? (
        <HStack py="4" spacing={4} as={ScrollContainer}>
          {drinks.map((drink, i) => {
            const delay = i <= 6 ? i * DELAY_STEP : 0;

            return (
              <motion.div
                key={drink.uuid}
                animate={cardsControl}
                transition={{ delay }}
                initial={{ y: -100, opacity: 0 }}
              >
                <DrinkCard drink={drink} />
              </motion.div>
            );
          })}
        </HStack>
      ) : (
        <Empty {...empty} />
      )}
    </Box>
  );
}
