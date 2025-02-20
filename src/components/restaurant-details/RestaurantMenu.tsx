import { Restaurant } from '../../types/restaurant';

interface RestaurantMenuProps {
  restaurant: Restaurant;
}

export function RestaurantMenu({ restaurant }: RestaurantMenuProps) {
  return (
    <div className="p-4">
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-3">Popular Dishes</h3>
        <div className="grid gap-4">
          {restaurant.popularDishes.map((dish, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg"
            >
              <div className="flex-1">
                <h4 className="font-medium">{dish}</h4>
                <p className="text-sm text-gray-500">
                  {/* In a real app, we would have more dish details */}
                  Highly recommended by our customers
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-3">Full Menu</h3>
        <p className="text-gray-500 text-center py-8">
          Full menu details coming soon...
        </p>
      </div>
    </div>
  );
}