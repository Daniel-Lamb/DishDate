import { motion } from 'framer-motion';
import { AchievementTier } from '../../types/achievement';
import { cn } from '../../utils/cn';

interface AchievementMedalProps {
  tier: AchievementTier;
  icon: any;
}

export function AchievementMedal({ tier, icon: Icon }: AchievementMedalProps) {
  const medalColors = {
    bronze: 'bg-amber-100 text-amber-600',
    silver: 'bg-gray-100 text-gray-600',
    gold: 'bg-yellow-100 text-yellow-600'
  };

  const medalRings = {
    bronze: 'ring-amber-200',
    silver: 'ring-gray-200',
    gold: 'ring-yellow-200'
  };

  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      className={cn(
        "relative w-12 h-12 rounded-full ring-4 flex items-center justify-center",
        medalColors[tier],
        medalRings[tier]
      )}
    >
      <Icon className="w-6 h-6" />
      <div className={cn(
        "absolute -bottom-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold",
        tier === 'gold' ? 'bg-yellow-500 text-white' : 
        tier === 'silver' ? 'bg-gray-500 text-white' :
        'bg-amber-500 text-white'
      )}>
        {tier === 'gold' ? 'G' : tier === 'silver' ? 'S' : 'B'}
      </div>
    </motion.div>
  );
}