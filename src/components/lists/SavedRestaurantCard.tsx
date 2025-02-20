import { MapPin, Star, DollarSign, Trash2 } from 'lucide-react';
import { Restaurant } from '../../types/restaurant';
import { useState } from 'react';
import { DeleteRestaurantDialog } from './DeleteRestaurantDialog';

interface SavedRestaurantCardProps {
  restaurant: Restaurant;
  onRemove: () => void;
}

export function SavedRestaurantCard({ restaurant, onRemove }: SavedRestaurantCardProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="flex">
          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="w-32 h-32 object-cover"
          />
          <div className="flex-1 p-4">
            <div className="flex justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {restaurant.name}
                </h3>
                <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 stroke-yellow-400" />
                    <span>{restaurant.rating}</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{restaurant.distance} miles</span>
                  </div>
                  <span>•</span>
                  <div className="flex">
                    {Array(restaurant.priceRange.length)
                      .fill('$')
                      .map((_, i) => (
                        <DollarSign key={i} className="w-4 h-4 text-green-600" />
                      ))}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setShowDeleteDialog(true)}
                className="p-2 text-gray-400 hover:text-red-500 rounded-lg hover:bg-gray-100"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
            <div className="mt-2">
              <p className="text-sm text-gray-600">{restaurant.description}</p>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {restaurant.dietaryOptions.map((option) => (
                <span
                  key={option}
                  className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-600"
                >
                  {option}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <DeleteRestaurantDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={onRemove}
        restaurantName={restaurant.name}
      />
    </>
  );
}