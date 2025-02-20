import { motion, PanInfo } from 'framer-motion';
import { MapPin, Star, DollarSign, UtensilsCrossed, ChevronUp } from 'lucide-react';
import { Restaurant } from '../types/restaurant';
import { SaveToListDialog } from './lists/SaveToListDialog';
import { RestaurantDetails } from './restaurant-details/RestaurantDetails';
import { SwipeFeedback } from './swipe-feedback/SwipeFeedback';
import { useState } from 'react';
import { useSwipeGestures } from '../hooks/useSwipeGestures';

interface RestaurantCardProps {
  restaurant: Restaurant;
  onSwipe: (direction: string) => void;
  isTransitioning: boolean;
}

export function RestaurantCard({ restaurant, onSwipe, isTransitioning }: RestaurantCardProps) {
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
  
  const { handleDragEnd, swipeAnimation } = useSwipeGestures({
    onSwipeLeft: () => {
      setSwipeDirection('left');
      onSwipe('left');
    },
    onSwipeRight: () => {
      setSwipeDirection('right');
      setShowSaveDialog(true);
    },
    onSwipeUp: () => {
      setShowDetails(true);
    }
  });

  const handleSaveComplete = () => {
    setShowSaveDialog(false);
    onSwipe('right');
  };

  const handleSaveCancel = () => {
    setShowSaveDialog(false);
    // Reset card position without triggering a swipe
    setSwipeDirection(null);
  };

  return (
    <>
      <motion.div
        key={restaurant.id}
        className="absolute inset-4 z-10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          ...swipeAnimation,
          opacity: 1,
          scale: 1
        }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3 }}
        drag={!isTransitioning && !showSaveDialog}
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        onDragEnd={handleDragEnd}
        whileDrag={{ scale: 1.05 }}
      >
        <div className="w-full h-full bg-white rounded-xl shadow-xl overflow-hidden">
          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="w-full h-[60%] object-cover"
          />
          
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-6">
            <h2 className="text-3xl font-bold text-white mb-2">{restaurant.name}</h2>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 fill-yellow-400 stroke-yellow-400" />
                <span className="text-lg text-white">{restaurant.rating}</span>
              </div>
              <span className="text-white/60">•</span>
              <div className="flex items-center gap-1">
                <MapPin className="w-5 h-5 text-white" />
                <span className="text-white">{restaurant.distance} miles</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                <UtensilsCrossed className="w-5 h-5 text-white" />
                <span className="text-white">{restaurant.cuisine}</span>
              </div>
              <div className="flex">
                {Array(restaurant.priceRange.length)
                  .fill('$')
                  .map((_, i) => (
                    <DollarSign key={i} className="w-5 h-5 text-green-400" />
                  ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {restaurant.dietaryOptions.map((option) => (
                <span
                  key={option}
                  className="px-3 py-1 bg-white/10 rounded-full text-sm text-white"
                >
                  {option}
                </span>
              ))}
            </div>

            <button
              onClick={() => setShowDetails(true)}
              className="flex items-center justify-center gap-2 w-full py-3 bg-white/20 rounded-lg backdrop-blur-sm hover:bg-white/30 transition-colors text-white"
            >
              <ChevronUp className="w-5 h-5" />
              <span>View Details</span>
            </button>
          </div>
        </div>
      </motion.div>

      <SwipeFeedback
        direction={swipeDirection}
        onComplete={() => setSwipeDirection(null)}
      />

      <SaveToListDialog
        isOpen={showSaveDialog}
        onClose={handleSaveCancel}
        onSave={handleSaveComplete}
        restaurant={restaurant}
      />

      <RestaurantDetails
        restaurant={restaurant}
        isOpen={showDetails}
        onClose={() => setShowDetails(false)}
      />
    </>
  );
}