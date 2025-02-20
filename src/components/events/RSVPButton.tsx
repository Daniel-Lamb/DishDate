import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Loader2 } from 'lucide-react';
import { Event } from '../../types/event';
import { RSVPConfirmDialog } from './RSVPConfirmDialog';
import { useRSVP } from '../../hooks/useRSVP';

interface RSVPButtonProps {
  event: Event;
  onRSVP: () => void;
}

export function RSVPButton({ event, onRSVP }: RSVPButtonProps) {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const { isRSVPd, isLoading, handleRSVP, handleCancelRSVP } = useRSVP(event.id);

  const handleClick = () => {
    if (isRSVPd) {
      setShowConfirmDialog(true);
    } else {
      handleRSVP();
      onRSVP();
    }
  };

  if (event.status === 'canceled') {
    return (
      <button
        disabled
        className="w-full px-4 py-2 bg-gray-300 text-gray-600 rounded-lg cursor-not-allowed"
      >
        Event Canceled
      </button>
    );
  }

  if (event.status === 'full' && !isRSVPd) {
    return (
      <button
        className="w-full px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
      >
        Join Waitlist
      </button>
    );
  }

  return (
    <>
      <button
        onClick={handleClick}
        disabled={isLoading}
        className={`w-full px-4 py-2 rounded-lg transition-colors relative ${
          isRSVPd
            ? 'bg-green-500 text-white hover:bg-red-500'
            : 'bg-blue-500 text-white hover:bg-blue-600'
        }`}
      >
        <AnimatePresence>
          {isLoading ? (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Loader2 className="w-5 h-5 animate-spin" />
            </motion.span>
          ) : isRSVPd ? (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center gap-2"
            >
              <Check className="w-4 h-4" />
              RSVP'd
            </motion.span>
          ) : (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              RSVP
            </motion.span>
          )}
        </AnimatePresence>
      </button>

      <RSVPConfirmDialog
        isOpen={showConfirmDialog}
        onClose={() => setShowConfirmDialog(false)}
        onConfirm={() => {
          handleCancelRSVP();
          setShowConfirmDialog(false);
        }}
        event={event}
      />
    </>
  );
}