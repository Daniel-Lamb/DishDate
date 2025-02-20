import { Restaurant } from '../../types/restaurant';
import { RestaurantFilters } from '../../types/filters';

interface MapViewProps {
  restaurants: Restaurant[];
  filters: RestaurantFilters;
}

export function MapView({ restaurants, filters }: MapViewProps) {
  return (
    <div className="h-[calc(100vh-8rem)] bg-[#FBFFB1] p-4">
      <div className="bg-white rounded-lg p-4 h-full flex items-center justify-center">
        <p className="text-gray-500">Map integration coming soon...</p>
      </div>
    </div>
  );
}