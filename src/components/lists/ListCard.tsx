import { Trash2, ChevronRight } from 'lucide-react';
import { List } from '../../types/list';
import { useState } from 'react';
import { DeleteListDialog } from './DeleteListDialog';

interface ListCardProps {
  list: List;
  onDelete: () => void;
  onClick: () => void;
}

export function ListCard({ list, onDelete, onClick }: ListCardProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  return (
    <>
      <div 
        className="bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
        onClick={onClick}
      >
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{list.name}</h3>
              <p className="text-sm text-gray-500 mt-1">
                {list.restaurants.length} {list.restaurants.length === 1 ? 'restaurant' : 'restaurants'}
              </p>
            </div>
            <div className="flex items-center gap-2">
              {list.id !== 'favorites' && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowDeleteDialog(true);
                  }}
                  className="p-2 text-gray-400 hover:text-red-500 rounded-lg hover:bg-gray-100"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              )}
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </div>

          {list.restaurants.length > 0 && (
            <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
              {list.restaurants.slice(0, 3).map((restaurant) => (
                <img
                  key={restaurant.id}
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="w-20 h-20 rounded-lg object-cover"
                />
              ))}
              {list.restaurants.length > 3 && (
                <div className="w-20 h-20 rounded-lg bg-gray-100 flex items-center justify-center">
                  <span className="text-sm text-gray-500">
                    +{list.restaurants.length - 3}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <DeleteListDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={onDelete}
        listName={list.name}
      />
    </>
  );
}