import { Filter } from 'lucide-react';
import { useState } from 'react';
import { FilterSection } from './filters/FilterSection';
import { FilterChip } from './filters/FilterChip';
import { DistanceSlider } from './filters/DistanceSlider';
import { RestaurantFilters, defaultFilters } from '../types/filters';

interface FilterBarProps {
  onFilterChange: (filters: RestaurantFilters) => void;
}

export function FilterBar({ onFilterChange }: FilterBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<RestaurantFilters>(defaultFilters);

  const cuisineTypes = ['All', 'Italian', 'Japanese', 'Mexican', 'Indian', 'Thai'];
  const ambianceOptions = ['Casual', 'Fine dining', 'Romantic', 'Family-friendly', 'Trendy', 'Outdoor seating'];
  const cuisineFeatures = ['Farm-to-table', 'Fusion cuisine', 'Neapolitan pizza', 'Sichuan cuisine'];
  const serviceOptions = ['Dine-in', 'Takeout', 'Delivery', 'Curbside pickup', 'Drive-thru'];
  const sortOptions = [
    { value: 'distance', label: 'Distance' },
    { value: 'rating', label: 'Rating' },
    { value: 'price', label: 'Price' }
  ];

  const updateFilters = (updates: Partial<RestaurantFilters>) => {
    const newFilters = { ...filters, ...updates };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const toggleArrayFilter = (key: keyof RestaurantFilters, value: string) => {
    const currentArray = filters[key] as string[];
    const newArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value];
    updateFilters({ [key]: newArray });
  };

  return (
    <div className="absolute top-4 right-4 z-20">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 bg-red-500 rounded-full shadow-lg flex items-center justify-center hover:bg-red-600 transition-colors"
      >
        <Filter className="w-6 h-6 text-white" />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-lg shadow-lg p-4 max-h-[80vh] overflow-y-auto">
          <FilterSection title="Sort By">
            {sortOptions.map(option => (
              <FilterChip
                key={option.value}
                label={option.label}
                selected={filters.sortBy === option.value}
                onClick={() => updateFilters({ sortBy: option.value as 'distance' | 'rating' | 'price' })}
              />
            ))}
          </FilterSection>

          <FilterSection title="Distance">
            <DistanceSlider
              value={filters.distance}
              onChange={(value) => updateFilters({ distance: value })}
            />
          </FilterSection>

          <FilterSection title="Cuisine Type">
            {cuisineTypes.map(cuisine => (
              <FilterChip
                key={cuisine}
                label={cuisine}
                selected={filters.cuisine === cuisine}
                onClick={() => updateFilters({ cuisine })}
              />
            ))}
          </FilterSection>

          <FilterSection title="Ambiance">
            {ambianceOptions.map(option => (
              <FilterChip
                key={option}
                label={option}
                selected={filters.ambiance.includes(option)}
                onClick={() => toggleArrayFilter('ambiance', option)}
              />
            ))}
          </FilterSection>

          <FilterSection title="Cuisine Features">
            {cuisineFeatures.map(feature => (
              <FilterChip
                key={feature}
                label={feature}
                selected={filters.cuisineFeatures.includes(feature)}
                onClick={() => toggleArrayFilter('cuisineFeatures', feature)}
              />
            ))}
          </FilterSection>

          <FilterSection title="Service Options">
            {serviceOptions.map(option => (
              <FilterChip
                key={option}
                label={option}
                selected={filters.serviceOptions.includes(option)}
                onClick={() => toggleArrayFilter('serviceOptions', option)}
              />
            ))}
          </FilterSection>
        </div>
      )}
    </div>
  );
}