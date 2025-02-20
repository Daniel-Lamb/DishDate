import { useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { List } from '../../types/list';
import { Restaurant } from '../../types/restaurant';
import { SavedRestaurantCard } from './SavedRestaurantCard';
import { FilterDialog } from './FilterDialog';
import { useLists } from '../../hooks/useLists';

interface RestaurantListProps {
  list: List;
}

export function RestaurantList({ list }: RestaurantListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<'name' | 'rating' | 'distance'>('name');
  const { removeFromList } = useLists();

  const filteredRestaurants = list.restaurants
    .filter(restaurant =>
      restaurant.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'distance':
          return a.distance - b.distance;
        default:
          return a.name.localeCompare(b.name);
      }
    });

  const handleRemoveRestaurant = async (restaurant: Restaurant) => {
    await removeFromList(list.id, restaurant.id);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">{list.name}</h2>
        <p className="text-gray-500 mt-1">
          {list.restaurants.length} {list.restaurants.length === 1 ? 'restaurant' : 'restaurants'}
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search restaurants..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={() => setShowFilters(true)}
          className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <SlidersHorizontal className="w-5 h-5" />
        </button>
      </div>

      <div className="grid gap-4">
        {filteredRestaurants.map((restaurant) => (
          <SavedRestaurantCard
            key={restaurant.id}
            restaurant={restaurant}
            onRemove={() => handleRemoveRestaurant(restaurant)}
          />
        ))}
      </div>

      <FilterDialog
        isOpen={showFilters}
        onClose={() => setShowFilters(false)}
        sortBy={sortBy}
        onSortByChange={setSortBy}
      />
    </div>
  );
}