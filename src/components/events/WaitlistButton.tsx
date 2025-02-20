import { useState } from 'react';
import { useWaitlist } from '../../hooks/useWaitlist';
import { Event } from '../../types/event';
import { WaitlistConfirmDialog } from './WaitlistConfirmDialog';

interface WaitlistButtonProps {
  event: Event;
  onJoinWaitlist: () => void;
}

export function WaitlistButton({ event, onJoinWaitlist }: WaitlistButtonProps) {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const { isWaitlisted, position, isLoading, handleJoinWaitlist, handleLeaveWaitlist } = useWaitlist(event.id);

  return (
    <>
      {isWaitlisted ? (
        <button
          onClick={() => setShowConfirmDialog(true)}
          disabled={isLoading}
          className="w-full px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors disabled:opacity-50"
        >
          {isLoading ? 'Processing...' : `Waitlisted (#${position})`}
        </button>
      ) : (
        <button
          onClick={handleJoinWaitlist}
          disabled={isLoading}
          className="w-full px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors disabled:opacity-50"
        >
          {isLoading ? 'Processing...' : 'Join Waitlist'}
        </button>
      )}

      <WaitlistConfirmDialog
        isOpen={showConfirmDialog}
        onClose={() => setShowConfirmDialog(false)}
        onConfirm={() => {
          handleLeaveWaitlist();
          setShowConfirmDialog(false);
        }}
        event={event}
      />
    </>
  );
}