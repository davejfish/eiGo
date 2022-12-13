import { motion } from 'framer-motion';

export default function ScoreDisplay({ points }) {
  return (
    <motion.div 
      key={points}
      animate={{
        scale: [1, 1.1, .9, 1],
      }}
      transition={{
        duration: 2,
        ease: 'easeInOut',
      }}>
      <h3 className={'block'}>
        points: {points}
      </h3>
    </motion.div>
  );
}
