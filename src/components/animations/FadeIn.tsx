import { ReactNode } from 'react';
import { motion, MotionStyle } from 'framer-motion';

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
  return (
    <motion.div
      animate={{ x: 0, y: 0, opacity: 1 }}
      initial={{ x, y, opacity: 0 }}
      transition={{ delay }}
      style={style}
    >
      {children}
    </motion.div>
  );
}
