import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { Event } from '../../types/event';

interface WaitlistConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  event: Event;
}

export function WaitlistConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  event
}: WaitlistConfirmDialogProps) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 w-[90vw] max-w-md">
          <div className="flex justify-between items-center mb-4">
            <Dialog.Title className="text-xl font-semibold text-gray-900">
              Leave Waitlist
            </Dialog.Title>
            <Dialog.Close className="text-gray-400 hover:text-gray-500">
              <X className="w-5 h-5" />
            </Dialog.Close>
          </div>

          <p className="text-gray-600 mb-6">
            Are you sure you want to leave the waitlist for "{event.title}"? Your spot will be given to the next person in line.
          </p>

          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Stay on Waitlist
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors"
            >
              Leave Waitlist
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}