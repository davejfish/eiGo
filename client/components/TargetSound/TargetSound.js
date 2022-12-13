import { motion } from 'framer-motion';

export default function TargetSound({ targetSound }) {
  return (
    <motion.div
      animate={{
        scale: [1, .9, 1.1, .9, 1]
      }}
      transition={{
        duration: 2,
        ease: 'easeInOut',
        repeat: Infinity,
        repeatDelay: 2,
      }}>
      <h2 className={'title'}>
        {targetSound}
      </h2>
    </motion.div>
    
  );
}
