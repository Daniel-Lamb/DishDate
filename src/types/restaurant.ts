export interface Restaurant {
  id: string;
  name: string;
  image: string;
  rating: number;
  distance: number;
  cuisine: string;
  priceRange: '$' | '$$' | '$$$' | '$$$$';
  description: string;
  popularDishes: string[];
  dietaryOptions: string[];
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  ambiance: string[];
  cuisineFeatures: string[];
  serviceOptions: string[];
}