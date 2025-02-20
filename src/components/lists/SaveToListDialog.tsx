import * as Dialog from '@radix-ui/react-dialog';
import { X, Plus, Check } from 'lucide-react';
import { useState } from 'react';
import { Restaurant } from '../../types/restaurant';
import { useLists } from '../../hooks/useLists';
import { CreateListDialog } from './CreateListDialog';

interface SaveToListDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  restaurant: Restaurant;
}

export function SaveToListDialog({
  isOpen,
  onClose,
  onSave,
  restaurant
}: SaveToListDialogProps) {
  const [showCreateList, setShowCreateList] = useState(false);
  const [savingToList, setSavingToList] = useState<string | null>(null);
  const { lists, saveToList, isRestaurantInList } = useLists();

  const handleSave = async (listId: string) => {
    setSavingToList(listId);
    try {
      await saveToList(listId, restaurant);
      onSave();
    } catch (error) {
      console.error('Error saving to list:', error);
    } finally {
      setSavingToList(null);
    }
  };

  const handleCreateListComplete = async (listId: string) => {
    setShowCreateList(false);
    if (listId) {
      await handleSave(listId);
    }
  };

  return (
    <>
      <Dialog.Root open={isOpen} onOpenChange={onClose}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50" />
          <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 w-[90vw] max-w-md">
            <div className="flex justify-between items-center mb-4">
              <Dialog.Title className="text-xl font-semibold text-gray-900">
                Save to List
              </Dialog.Title>
              <Dialog.Close className="text-gray-400 hover:text-gray-500">
                <X className="w-5 h-5" />
              </Dialog.Close>
            </div>

            <div className="space-y-2 mb-4">
              {lists.map((list) => {
                const isInList = isRestaurantInList(list.id, restaurant.id);
                const isSaving = savingToList === list.id;
                
                return (
                  <button
                    key={list.id}
                    onClick={() => !isInList && !isSaving && handleSave(list.id)}
                    disabled={isInList || isSaving}
                    className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                      isInList
                        ? 'bg-green-50 text-green-700 cursor-not-allowed'
                        : isSaving
                        ? 'bg-gray-50 cursor-wait'
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <span>{list.name}</span>
                    {isInList && <Check className="w-4 h-4 text-green-600" />}
                    {isSaving && (
                      <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
                    )}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setShowCreateList(true)}
              className="w-full flex items-center justify-center gap-2 p-3 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Create New List</span>
            </button>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      <CreateListDialog
        isOpen={showCreateList}
        onClose={() => setShowCreateList(false)}
        onCreateList={handleCreateListComplete}
      />
    </>
  );
}