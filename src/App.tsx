import React, { useState, useEffect } from 'react';
import { RestaurantCard } from './components/RestaurantCard';
import { FilterBar } from './components/FilterBar';
import { TabBar } from './components/layout/TabBar';
// import { MapView } from './components/tabs/MapView';
import { SavedRestaurants } from './components/tabs/SavedRestaurants';
import { EventsAndGroups } from './components/tabs/EventsAndGroups';
import { Profile } from './components/tabs/Profile';
import { mockRestaurants } from './data/mockRestaurants';
import { Restaurant } from './types/restaurant';
import { TabId } from './types/navigation';
import { RestaurantFilters, defaultFilters } from './types/filters';
import { LoadingScreen } from './components/LoadingScreen';
import { AnimatePresence } from 'framer-motion';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<TabId>('discover');
  const [likedRestaurants, setLikedRestaurants] = useState<Restaurant[]>([]);
  const [filters, setFilters] = useState<RestaurantFilters>(defaultFilters);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleSwipe = (direction: string) => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    
    if (direction === 'right') {
      setLikedRestaurants([...likedRestaurants, mockRestaurants[currentIndex]]);
    }
    
    // Wait for the swipe animation to complete before showing the next card
    setTimeout(() => {
      if (currentIndex < mockRestaurants.length - 1) {
        setCurrentIndex(prev => prev + 1);
      }
      setIsTransitioning(false);
    }, 300);
  };

  const handleFilterChange = (newFilters: RestaurantFilters) => {
    setFilters(newFilters);
    setCurrentIndex(0);
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'discover':
        return (
          <div className="flex-1 flex justify-center items-center relative">
            {/* Only show FilterBar in the Discover tab */}
            <FilterBar onFilterChange={handleFilterChange} />
            
            <AnimatePresence mode="wait">
              {currentIndex < mockRestaurants.length ? (
                <RestaurantCard
                  key={mockRestaurants[currentIndex].id}
                  restaurant={mockRestaurants[currentIndex]}
                  onSwipe={handleSwipe}
                  isTransitioning={isTransitioning}
                />
              ) : (
                <div className="text-center text-gray-900">
                  <h2 className="text-2xl font-semibold">
                    No more restaurants to show!
                  </h2>
                  <p className="mt-2">
                    Try adjusting your filters to see more options.
                  </p>
                </div>
              )}
            </AnimatePresence>
          </div>
        );
      // case 'map':
      //   return <MapView restaurants={mockRestaurants} filters={filters} />;
      case 'saved':
        return <SavedRestaurants />;
      case 'events-groups':
        return <EventsAndGroups />;
      case 'profile':
        return <Profile />;
      default:
        return null;
    }
  };

  return (
    <>
      <AnimatePresence>
        {isLoading && <LoadingScreen />}
      </AnimatePresence>

      <div className="min-h-screen flex flex-col">
        <header className="nav-header shadow-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-white">DishDate</h1>
          </div>
        </header>

        <main className="flex-1 flex flex-col">
          {renderActiveTab()}
        </main>

        <nav className="nav-footer fixed bottom-0 left-0 right-0 shadow-lg z-50">
          <TabBar activeTab={activeTab} onTabChange={setActiveTab} />
        </nav>
      </div>
    </>
  );
}

export default App;