import { Home, BookmarkCheck, Users, User } from 'lucide-react';
import { TabId } from '../../types/navigation';
import { cn } from '../../utils/cn';

interface TabBarProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

export function TabBar({ activeTab, onTabChange }: TabBarProps) {
  const tabs = [
    { id: 'discover' as TabId, icon: Home, label: 'Discover' },
    // { id: 'map' as TabId, icon: Map, label: 'Map' },
    { id: 'saved' as TabId, icon: BookmarkCheck, label: 'Saved' },
    { id: 'events-groups' as TabId, icon: Users, label: 'Events & Groups' },
    { id: 'profile' as TabId, icon: User, label: 'Profile' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex justify-around">
        {tabs.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => onTabChange(id)}
            className={cn(
              'flex flex-col items-center py-3 px-4 text-sm',
              activeTab === id
                ? 'text-white'
                : 'text-white/60 hover:text-white'
            )}
          >
            <Icon className="w-6 h-6" />
            <span className="mt-1">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}