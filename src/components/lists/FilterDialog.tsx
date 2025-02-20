import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';

interface FilterDialogProps {
  isOpen: boolean;
  onClose: () => void;
  sortBy: 'name' | 'rating' | 'distance';
  onSortByChange: (value: 'name' | 'rating' | 'distance') => void;
}

export function FilterDialog({
  isOpen,
  onClose,
  sortBy,
  onSortByChange
}: FilterDialogProps) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 w-[90vw] max-w-md">
          <div className="flex justify-between items-start mb-6">
            <Dialog.Title className="text-xl font-semibold text-gray-900">
              Sort & Filter
            </Dialog.Title>
            <Dialog.Close className="text-gray-400 hover:text-gray-500">
              <X className="w-5 h-5" />
            </Dialog.Close>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Sort by</h3>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: 'name', label: 'Name' },
                  { value: 'rating', label: 'Rating' },
                  { value: 'distance', label: 'Distance' }
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => onSortByChange(option.value as typeof sortBy)}
                    className={`py-2 px-4 rounded-lg text-sm ${
                      sortBy === option.value
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-end">
              <Dialog.Close className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                Apply
              </Dialog.Close>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}