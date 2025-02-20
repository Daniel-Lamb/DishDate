import { Utensils } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const loadingPhrases = [
  "Finding your perfect flavor match...",
  "Stirring up some tasty suggestions...",
  "Setting the table for delicious discoveries...",
  "Cooking up your next favorite spot...",
  "Preparing a feast for your eyes...",
  "Gathering the finest ingredients...",
  "Spicing up your dining options...",
  "Simmering with possibilities...",
  "Plating up perfection...",
  "Adding the final garnish..."
];

export function LoadingScreen() {
  const [phrase, setPhrase] = useState(loadingPhrases[0]);

  useEffect(() => {
    const randomPhrase = loadingPhrases[Math.floor(Math.random() * loadingPhrases.length)];
    setPhrase(randomPhrase);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="loading-screen"
    >
      <motion.div
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 10, -10, 0]
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="loading-icon"
      >
        <Utensils className="w-20 h-20 text-red-500" />
      </motion.div>

      <div className="loading-progress">
        <div className="loading-progress-bar" />
      </div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="loading-text"
      >
        {phrase}
      </motion.p>
    </motion.div>
  );
}