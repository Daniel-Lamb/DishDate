import { useState } from 'react';
import { ListsSection } from '../lists/ListsSection';
import { RestaurantList } from '../lists/RestaurantList';
import { List } from '../../types/list';
import { BackButton } from '../BackButton';

export function SavedRestaurants() {
  const [selectedList, setSelectedList] = useState<List | null>(null);

  return (
    <div className="h-[calc(100vh-8rem)] bg-white p-4 overflow-auto">
      <div className="max-w-2xl mx-auto">
        {selectedList ? (
          <>
            <div className="mb-6">
              <BackButton onClick={() => setSelectedList(null)} />
            </div>
            <RestaurantList list={selectedList} />
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Saved Restaurants</h2>
            <ListsSection onSelectList={setSelectedList} />
          </>
        )}
      </div>
    </div>
  );
}