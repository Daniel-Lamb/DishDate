import { motion } from 'framer-motion';
import { AchievementTier } from '../../types/achievement';

interface AchievementProgressProps {
  progress: number;
  total: number;
  tier: AchievementTier;
}

export function AchievementProgress({ progress, total, tier }: AchievementProgressProps) {
  const progressPercent = (progress / total) * 100;
  
  const progressColors = {
    bronze: 'bg-amber-500',
    silver: 'bg-gray-500',
    gold: 'bg-yellow-500'
  };

  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center text-xs text-gray-600">
        <span>{progress} / {total}</span>
        <span>{progressPercent.toFixed(0)}%</span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className={`h-full ${progressColors[tier]}`}
        />
      </div>
    </div>
  );
}