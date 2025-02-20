import { Restaurant } from '../../types/restaurant';

interface RestaurantMapProps {
  restaurant: Restaurant;
}

export function RestaurantMap({ restaurant }: RestaurantMapProps) {
  return (
    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
      <p className="text-gray-500">Map integration coming soon...</p>
    </div>
  );
}