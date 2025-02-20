import { useState } from 'react';
import { Award, Users, MapPin, Star } from 'lucide-react';
import { Achievement } from '../../types/achievement';
import { AchievementCard } from './AchievementCard';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

const mockAchievements: Achievement[] = [
  {
    id: '1',
    title: 'Food Explorer',
    description: 'Try different cuisines',
    icon: Award,
    tier: 'silver',
    progress: 3,
    total: 5,
    category: 'dining',
    isNew: true,
    unlockedAt: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Social Butterfly',
    description: 'Create group plans',
    icon: Users,
    tier: 'bronze',
    progress: 2,
    total: 5,
    category: 'social'
  },
  {
    id: '3',
    title: 'City Explorer',
    description: 'Visit restaurants in different neighborhoods',
    icon: MapPin,
    tier: 'gold',
    progress: 10,
    total: 10,
    category: 'exploration',
    unlockedAt: new Date(Date.now() - 86400000).toISOString()
  }
];

export function AchievementsSection() {
  const [achievements] = useState<Achievement[]>(mockAchievements);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'dining', label: 'Dining' },
    { id: 'social', label: 'Social' },
    { id: 'exploration', label: 'Exploration' }
  ];

  const filteredAchievements = achievements.filter(
    achievement => selectedCategory === 'all' || achievement.category === selectedCategory
  );

  const handleShare = (achievement: Achievement) => {
    // In a real app, implement social sharing
    console.log('Sharing achievement:', achievement);
    
    // Trigger confetti for fun
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
              selectedCategory === category.id
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={selectedCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="grid gap-4"
        >
          {filteredAchievements.map(achievement => (
            <AchievementCard
              key={achievement.id}
              achievement={achievement}
              onShare={handleShare}
            />
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}