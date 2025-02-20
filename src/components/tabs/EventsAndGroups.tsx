import { useState } from 'react';
import { Events } from './Events';
import { GroupPlanner } from './GroupPlanner';

type TabType = 'events' | 'groups';

export function EventsAndGroups() {
  const [activeTab, setActiveTab] = useState<TabType>('events');

  return (
    <div className="h-[calc(100vh-8rem)] bg-white p-4 overflow-auto">
      <div className="max-w-2xl mx-auto">
        {/* Tab Selector */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab('events')}
            className={`flex-1 py-2 px-4 rounded-lg text-center transition-colors ${
              activeTab === 'events'
                ? 'bg-red-500 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            Events
          </button>
          <button
            onClick={() => setActiveTab('groups')}
            className={`flex-1 py-2 px-4 rounded-lg text-center transition-colors ${
              activeTab === 'groups'
                ? 'bg-red-500 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            Groups
          </button>
        </div>

        {/* Content */}
        <div className="mt-4">
          {activeTab === 'events' ? <Events /> : <GroupPlanner />}
        </div>
      </div>
    </div>
  );
}