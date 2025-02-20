import * as Dialog from '@radix-ui/react-dialog';
import { X, AlertTriangle } from 'lucide-react';

interface DeleteRestaurantDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  restaurantName: string;
}

export function DeleteRestaurantDialog({
  isOpen,
  onClose,
  onConfirm,
  restaurantName
}: DeleteRestaurantDialogProps) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 w-[90vw] max-w-md">
          <div className="flex justify-between items-start mb-6">
            <Dialog.Title className="text-xl font-semibold text-gray-900">
              Remove Restaurant
            </Dialog.Title>
            <Dialog.Close className="text-gray-400 hover:text-gray-500">
              <X className="w-5 h-5" />
            </Dialog.Close>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 bg-red-50 rounded-lg text-red-600">
              <AlertTriangle className="w-5 h-5 shrink-0" />
              <p className="text-sm">
                Are you sure you want to remove "{restaurantName}" from this list?
              </p>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onConfirm();
                  onClose();
                }}
                className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors"
              >
                Remove
              </button>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}