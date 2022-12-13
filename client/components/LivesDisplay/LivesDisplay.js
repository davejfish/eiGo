import { motion } from 'framer-motion';

export default function LivesDisplay({ lives }) {
  return (
    <motion.div 
      key={lives}
      animate={{
        scale: [1, 1.1, .9, 1],
      }}
      transition={{
        duration: 2,
        ease: 'easeInOut',
      }}>
      <motion.h3
        className={'block'}>
        lives: {lives.map((life, index) => (
          <motion.span 
            key={index}>
            {life}
          </motion.span>
        ))}
      </motion.h3>
    </motion.div>
  );
}
