import { ReactNode, useEffect } from 'react';
import { motion, MotionStyle, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface FadeInProps {
  x?: number;
  y?: number;
  delay?: number;
  children: ReactNode;
  style?: MotionStyle;
}

export function FadeIn({
  children,
  x = 0,
  y = 0,
  delay = 0,
  style,
}: FadeInProps) {
  const control = useAnimation();

  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      control.start({ x: 0, y: 0, opacity: 1 });
    }
  }, [control, inView]);

  return (
    <motion.div
      ref={ref}
      initial={{ x, y, opacity: 0 }}
      animate={control}
      transition={{ delay }}
      style={style}
    >
      {children}
    </motion.div>
  );
}
