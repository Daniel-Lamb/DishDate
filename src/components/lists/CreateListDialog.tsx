import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { useState } from 'react';
import { useLists } from '../../hooks/useLists';

interface CreateListDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateList: (listId: string) => void;
}

export function CreateListDialog({
  isOpen,
  onClose,
  onCreateList
}: CreateListDialogProps) {
  const [listName, setListName] = useState('');
  const [error, setError] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const { createList, lists } = useLists();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!listName.trim()) {
      setError('List name cannot be empty');
      return;
    }

    if (lists.some(list => list.name.toLowerCase() === listName.trim().toLowerCase())) {
      setError('A list with this name already exists');
      return;
    }

    setIsCreating(true);
    try {
      const listId = await createList({ 
        name: listName.trim(),
        description: ''
      });
      onCreateList(listId);
      setListName('');
      setError('');
    } catch (error) {
      console.error('Error creating list:', error);
      setError('Failed to create list. Please try again.');
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 w-[90vw] max-w-md">
          <div className="flex justify-between items-center mb-4">
            <Dialog.Title className="text-xl font-semibold text-gray-900">
              Create New List
            </Dialog.Title>
            <Dialog.Close className="text-gray-400 hover:text-gray-500">
              <X className="w-5 h-5" />
            </Dialog.Close>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="listName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                List Name
              </label>
              <input
                type="text"
                id="listName"
                value={listName}
                onChange={(e) => {
                  setListName(e.target.value);
                  setError('');
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Date Night Spots"
                disabled={isCreating}
              />
              {error && (
                <p className="mt-1 text-sm text-red-600">{error}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isCreating}
              className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isCreating ? 'Creating...' : 'Create List'}
            </button>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}