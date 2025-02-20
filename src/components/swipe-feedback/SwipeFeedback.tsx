import { motion, AnimatePresence } from 'framer-motion';
import { Check, X } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useEffect } from 'react';

interface SwipeFeedbackProps {
  direction: 'left' | 'right' | null;
  onComplete: () => void;
}

export function SwipeFeedback({ direction, onComplete }: SwipeFeedbackProps) {
  useEffect(() => {
    if (direction === 'right') {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { x: 0.9, y: 0.5 }
      });
    }
  }, [direction]);

  return (
    <AnimatePresence>
      {direction && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onAnimationComplete={onComplete}
          className="fixed inset-0 flex items-center justify-center pointer-events-none"
          style={{
            backgroundColor: direction === 'right' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)'
          }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          >
            {direction === 'right' ? (
              <Check className="w-24 h-24 text-green-500" />
            ) : (
              <X className="w-24 h-24 text-red-500" />
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}