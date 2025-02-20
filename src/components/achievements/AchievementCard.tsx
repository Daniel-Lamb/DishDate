import { motion } from 'framer-motion';
import { Share2 } from 'lucide-react';
import { Achievement } from '../../types/achievement';
import { AchievementMedal } from './AchievementMedal';
import { AchievementProgress } from './AchievementProgress';
import { cn } from '../../utils/cn';

interface AchievementCardProps {
  achievement: Achievement;
  onShare: (achievement: Achievement) => void;
}

export function AchievementCard({ achievement, onShare }: AchievementCardProps) {
  const Icon = achievement.icon;
  const progressPercent = (achievement.progress / achievement.total) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "relative p-4 rounded-lg",
        achievement.isNew && "ring-2 ring-blue-500"
      )}
    >
      <div className="flex items-start gap-4">
        <AchievementMedal tier={achievement.tier} icon={Icon} />
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h4 className="font-medium text-gray-900">{achievement.title}</h4>
            {achievement.isNew && (
              <span className="px-2 py-0.5 bg-blue-100 text-blue-600 text-xs rounded-full">
                New!
              </span>
            )}
          </div>
          
          <p className="text-sm text-gray-500 mt-1">{achievement.description}</p>
          
          <div className="mt-3">
            <AchievementProgress
              progress={achievement.progress}
              total={achievement.total}
              tier={achievement.tier}
            />
          </div>

          {achievement.unlockedAt && (
            <p className="text-xs text-gray-500 mt-2">
              Unlocked {new Date(achievement.unlockedAt).toLocaleDateString()}
            </p>
          )}
        </div>

        <button
          onClick={() => onShare(achievement)}
          className="shrink-0 p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
        >
          <Share2 className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}