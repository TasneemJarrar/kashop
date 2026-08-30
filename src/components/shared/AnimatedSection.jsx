import { motion } from 'motion/react';

const directions = {
  up: { y: 30, x: 0 },
  down: { y: -30, x: 0 },
  left: { x: 30, y: 0 },
  right: { x: -30, y: 0 },
};

export default function AnimatedSection({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.55,
  amount = 0.15,
}) {
  const initialPosition = directions[direction] || directions.up;

  return (
    <motion.div
      initial={{
        opacity: 0,
        ...initialPosition,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
      }}
      viewport={{
        once: true,
        amount,
      }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}