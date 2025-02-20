import { Award, Users, MapPin, Star, Heart, Clock } from 'lucide-react';
import { Achievement } from '../types/achievement';

export const mockAchievements: Achievement[] = [
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
  },
  {
    id: '4',
    title: 'Review Master',
    description: 'Write detailed restaurant reviews',
    icon: Star,
    tier: 'bronze',
    progress: 1,
    total: 10,
    category: 'social'
  },
  {
    id: '5',
    title: 'Foodie Favorite',
    description: 'Save restaurants to your favorites',
    icon: Heart,
    tier: 'silver',
    progress: 15,
    total: 20,
    category: 'dining'
  },
  {
    id: '6',
    title: 'Regular',
    description: 'Visit the same restaurant multiple times',
    icon: Clock,
    tier: 'bronze',
    progress: 2,
    total: 5,
    category: 'dining'
  }
];