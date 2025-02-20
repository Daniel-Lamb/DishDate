import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { useState } from 'react';
import { Group } from '../../types/group';

interface CreateGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateGroup: (group: Partial<Group>) => void;
}

export function CreateGroupModal({
  isOpen,
  onClose,
  onCreateGroup
}: CreateGroupModalProps) {
  const [groupName, setGroupName] = useState('');
  const [maxDistance, setMaxDistance] = useState(10);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreateGroup({
      name: groupName,
      preferences: {
        maxDistance,
        cuisineTypes: []
      }
    });
    onClose();
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 w-[90vw] max-w-md">
          <div className="flex justify-between items-center mb-4">
            <Dialog.Title className="text-xl font-semibold">
              Create Group Plan
            </Dialog.Title>
            <Dialog.Close className="text-gray-400 hover:text-gray-500">
              <X className="w-5 h-5" />
            </Dialog.Close>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="groupName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Group Name
                </label>
                <input
                  type="text"
                  id="groupName"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="maxDistance"
                  className="block text-sm font-medium text-gray-700"
                >
                  Maximum Distance (miles)
                </label>
                <input
                  type="number"
                  id="maxDistance"
                  value={maxDistance}
                  onChange={(e) => setMaxDistance(Number(e.target.value))}
                  min="1"
                  max="50"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 text-white rounded-lg py-2 hover:bg-blue-600 transition-colors"
              >
                Create Group
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}