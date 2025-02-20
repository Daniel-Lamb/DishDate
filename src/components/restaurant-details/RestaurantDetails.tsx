import { motion } from 'framer-motion';
import { X, MapPin, Clock, Phone, Star, Share2, Heart, UtensilsCrossed } from 'lucide-react';
import { Restaurant } from '../../types/restaurant';
import { RestaurantMap } from './RestaurantMap';
import { RestaurantMenu } from './RestaurantMenu';
import { RestaurantReviews } from './RestaurantReviews';
import { SaveToListDialog } from '../lists/SaveToListDialog';
import { useState } from 'react';
import { cn } from '../../utils/cn';

interface RestaurantDetailsProps {
  restaurant: Restaurant;
  isOpen: boolean;
  onClose: () => void;
}

export function RestaurantDetails({ restaurant, isOpen, onClose }: RestaurantDetailsProps) {
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [activeTab, setActiveTab] = useState<'menu' | 'reviews' | 'info'>('menu');

  const tabs = [
    { id: 'menu' as const, label: 'Menu' },
    { id: 'reviews' as const, label: 'Reviews' },
    { id: 'info' as const, label: 'Info' }
  ];

  return (
    <motion.div
      initial={{ y: '100%' }}
      animate={{ y: isOpen ? 0 : '100%' }}
      exit={{ y: '100%' }}
      transition={{ type: 'spring', damping: 30, stiffness: 300 }}
      className="fixed inset-0 bg-white z-50 overflow-hidden"
    >
      <div className="h-full flex flex-col">
        {/* Header Image */}
        <div className="relative h-64">
          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="absolute bottom-4 left-4 text-white">
            <h2 className="text-2xl font-bold">{restaurant.name}</h2>
            <div className="flex items-center gap-2 mt-2">
              <Star className="w-4 h-4 fill-yellow-400 stroke-yellow-400" />
              <span>{restaurant.rating}</span>
              <span className="mx-1">•</span>
              <UtensilsCrossed className="w-4 h-4" />
              <span>{restaurant.cuisine}</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex justify-around p-4 border-b">
          <button
            onClick={() => setShowSaveDialog(true)}
            className="flex flex-col items-center gap-1 text-gray-600"
          >
            <Heart className="w-6 h-6" />
            <span className="text-sm">Save</span>
          </button>
          <button
            onClick={() => {
              // Implement share functionality
            }}
            className="flex flex-col items-center gap-1 text-gray-600"
          >
            <Share2 className="w-6 h-6" />
            <span className="text-sm">Share</span>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'flex-1 py-3 text-sm font-medium transition-colors',
                activeTab === tab.id
                  ? 'text-blue-500 border-b-2 border-blue-500'
                  : 'text-gray-500'
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto">
          {activeTab === 'menu' && <RestaurantMenu restaurant={restaurant} />}
          {activeTab === 'reviews' && <RestaurantReviews restaurant={restaurant} />}
          {activeTab === 'info' && (
            <div className="p-4 space-y-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gray-500 mt-1" />
                  <div>
                    <h3 className="font-medium">Location</h3>
                    <p className="text-gray-600">{restaurant.address}</p>
                    <div className="mt-2 h-48 rounded-lg overflow-hidden">
                      <RestaurantMap restaurant={restaurant} />
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-gray-500 mt-1" />
                  <div>
                    <h3 className="font-medium">Hours</h3>
                    <p className="text-gray-600">Open daily 11:00 AM - 10:00 PM</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-gray-500 mt-1" />
                  <div>
                    <h3 className="font-medium">Contact</h3>
                    <p className="text-gray-600">(555) 123-4567</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">Features</h3>
                <div className="flex flex-wrap gap-2">
                  {restaurant.serviceOptions.map(option => (
                    <span
                      key={option}
                      className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600"
                    >
                      {option}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">Dietary Options</h3>
                <div className="flex flex-wrap gap-2">
                  {restaurant.dietaryOptions.map(option => (
                    <span
                      key={option}
                      className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600"
                    >
                      {option}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <SaveToListDialog
        isOpen={showSaveDialog}
        onClose={() => setShowSaveDialog(false)}
        restaurant={restaurant}
      />
    </motion.div>
  );
}