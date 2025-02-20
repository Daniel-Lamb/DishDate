import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { Group } from '../../types/group';

interface LeaveGroupDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  group: Group;
  isCreator: boolean;
}

export function LeaveGroupDialog({
  isOpen,
  onClose,
  onConfirm,
  group,
  isCreator
}: LeaveGroupDialogProps) {
  const message = isCreator
    ? group.members.length > 1
      ? "As the group creator, leaving will transfer ownership to another member. Are you sure you want to leave?"
      : "As the last member, leaving will permanently delete this group. Are you sure?"
    : "Are you sure you want to leave this group? You will no longer participate in voting or see group updates.";

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 animate-fade-in" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 w-[90vw] max-w-md shadow-xl animate-scale-in">
          <div className="flex justify-between items-start mb-4">
            <Dialog.Title className="text-xl font-semibold text-gray-900">
              Leave Group
            </Dialog.Title>
            <Dialog.Close className="text-gray-400 hover:text-gray-500">
              <X className="w-5 h-5" />
            </Dialog.Close>
          </div>

          <p className="text-gray-600 mb-6">{message}</p>

          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors"
            >
              Leave Group
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}