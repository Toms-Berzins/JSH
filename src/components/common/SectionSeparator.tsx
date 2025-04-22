import React from 'react';
import { motion } from 'framer-motion';

interface SectionSeparatorProps {
  className?: string;
  flipped?: boolean;
  color?: string;
  visible?: boolean;
}

const SectionSeparator: React.FC<SectionSeparatorProps> = ({
  className = '',
  flipped = false,
  color = 'fill-white dark:fill-gray-800',
  visible = true,
}) => {
  // Don't render anything if not visible
  if (!visible) return null;
  
  // Enhanced wave animation
  const waveAnimation = {
    initial: { 
      opacity: 0,
      y: 20
    },
    animate: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    },
    whileInView: {
      scale: [1, 1.01, 1],
      transition: {
        repeat: Infinity,
        repeatType: "reverse" as const,
        duration: 3
      }
    }
  };

  return (
    <div className={`w-full overflow-hidden relative z-10 -mb-1 ${className}`}>
      <motion.svg
        initial="initial"
        animate="animate"
        whileInView="whileInView"
        variants={waveAnimation}
        viewport={{ once: false, amount: 0.3 }}
        viewBox="0 0 1440 320"
        className={`w-full ${flipped ? 'transform rotate-180' : ''}`}
        preserveAspectRatio="none"
      >
        <path
          d="M0,96L60,106.7C120,117,240,139,360,138.7C480,139,600,117,720,106.7C840,96,960,96,1080,101.3C1200,107,1320,117,1380,122.7L1440,128L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          className={color}
        />
      </motion.svg>
    </div>
  );
};

export default SectionSeparator; 