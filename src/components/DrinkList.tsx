import { Heading, HStack } from '@chakra-ui/react';
import ScrollContainer from 'react-indiana-drag-scroll';
import { motion, useAnimation } from 'framer-motion';

import { DrinkCard } from './DrinkCard';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';

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
  const control = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.5 });

  useEffect(() => {
    if (inView) {
      control.start({ x: 0, opacity: 1 });
    }
  }, [control, inView]);

  return (
    <>
      <motion.div ref={ref} animate={control} initial={{ x: 100, opacity: 0 }}>
        <Heading as="h2" mb="6">
          {title}
        </Heading>

        <ScrollContainer
          innerRef={(ref) => {
            if (ref) {
              ref.tabIndex = -1;
            }
          }}
        >
          <HStack py="4" mb="12" spacing={4}>
            {drinks.map((drink) => (
              <DrinkCard key={drink.uuid} drink={drink} />
            ))}
          </HStack>
        </ScrollContainer>
      </motion.div>
    </>
  );
}
