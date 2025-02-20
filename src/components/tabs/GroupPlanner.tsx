import { useState } from 'react';
import { Users, UserPlus, Share2 } from 'lucide-react';
import { CreateGroupModal } from '../groups/CreateGroupModal';
import { GroupCard } from '../groups/GroupCard';
import { mockGroups } from '../../data/mockGroups';
import { Group } from '../../types/group';

export function GroupPlanner() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [groups, setGroups] = useState<Group[]>(mockGroups);

  const handleCreateGroup = (newGroup: Partial<Group>) => {
    const group: Group = {
      id: String(groups.length + 1),
      createdBy: '1', // Current user ID
      members: [], // Start with empty members
      inviteCode: Math.random().toString(36).substring(2, 8).toUpperCase(),
      votes: {},
      ...newGroup,
    } as Group;

    setGroups([...groups, group]);
  };

  const handleJoinGroup = (groupId: string) => {
    // Handle joining group logic
    console.log('Joining group:', groupId);
  };

  return (
    <div className="h-[calc(100vh-8rem)] bg-gray-100 p-4 overflow-auto">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Group Plans</h2>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <UserPlus className="w-4 h-4" />
            <span>Create Group</span>
          </button>
        </div>

        <div className="mb-8">
          <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm">
            <input
              type="text"
              placeholder="Enter invite code"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
              Join
            </button>
          </div>
        </div>

        <div className="grid gap-4">
          {groups.map((group) => (
            <GroupCard
              key={group.id}
              group={group}
              onJoinGroup={handleJoinGroup}
            />
          ))}
        </div>
      </div>

      <CreateGroupModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreateGroup={handleCreateGroup}
      />
    </div>
  );
}