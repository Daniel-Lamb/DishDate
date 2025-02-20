export type AchievementTier = 'bronze' | 'silver' | 'gold';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: any;
  tier: AchievementTier;
  progress: number;
  total: number;
  category: 'dining' | 'social' | 'exploration';
  isNew?: boolean;
  unlockedAt?: string;
}

export interface AchievementProgress {
  currentTier: AchievementTier;
  nextTier?: {
    type: AchievementTier;
    remaining: number;
  };
}