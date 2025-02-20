import * as Dialog from '@radix-ui/react-dialog';
import { X, AlertTriangle } from 'lucide-react';

interface DeleteListDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  listName: string;
}

export function DeleteListDialog({
  isOpen,
  onClose,
  onConfirm,
  listName
}: DeleteListDialogProps) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 w-[90vw] max-w-md">
          <div className="flex justify-between items-start mb-6">
            <Dialog.Title className="text-xl font-semibold text-gray-900">
              Delete List
            </Dialog.Title>
            <Dialog.Close className="text-gray-400 hover:text-gray-500">
              <X className="w-5 h-5" />
            </Dialog.Close>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 bg-red-50 rounded-lg text-red-600">
              <AlertTriangle className="w-5 h-5 shrink-0" />
              <p className="text-sm">
                Are you sure you want to delete "{listName}"? This action cannot be undone.
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
                Delete List
              </button>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}