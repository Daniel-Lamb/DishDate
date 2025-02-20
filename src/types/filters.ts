export interface RestaurantFilters {
  cuisine: string;
  distance: number;
  ambiance: string[];
  cuisineFeatures: string[];
  serviceOptions: string[];
  sortBy: 'distance' | 'rating' | 'price';
}

export const defaultFilters: RestaurantFilters = {
  cuisine: 'All',
  distance: 10,
  ambiance: [],
  cuisineFeatures: [],
  serviceOptions: [],
  sortBy: 'distance'
};