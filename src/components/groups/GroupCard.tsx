import { Users, LogOut } from 'lucide-react';
import { useState } from 'react';
import { Group } from '../../types/group';
import { LeaveGroupDialog } from './LeaveGroupDialog';

interface GroupCardProps {
  group: Group;
  onJoinGroup: (groupId: string) => void;
  onLeaveGroup: (groupId: string) => void;
  currentUserId: string;
}

export function GroupCard({ 
  group, 
  onJoinGroup, 
  onLeaveGroup,
  currentUserId 
}: GroupCardProps) {
  const [showLeaveDialog, setShowLeaveDialog] = useState(false);
  const isMember = group.members.some(member => member.id === currentUserId);
  const isCreator = group.createdBy === currentUserId;

  const handleLeaveGroup = () => {
    onLeaveGroup(group.id);
    setShowLeaveDialog(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{group.name}</h3>
          <p className="text-sm text-gray-500 mt-1">
            {group.members.length} members
          </p>
        </div>
        <div className="flex -space-x-2">
          {group.members.slice(0, 3).map((member) => (
            <img
              key={member.id}
              src={member.avatar}
              alt={member.name}
              className="w-8 h-8 rounded-full border-2 border-white"
            />
          ))}
          {group.members.length > 3 && (
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs text-gray-600 border-2 border-white">
              +{group.members.length - 3}
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">
        <Users className="w-4 h-4" />
        <span>Invite Code: {group.inviteCode}</span>
      </div>

      {isMember ? (
        <button
          onClick={() => setShowLeaveDialog(true)}
          className="mt-4 w-full bg-red-500 text-white rounded-lg py-2 hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
        >
          <LogOut className="w-4 h-4" />
          <span>Leave Group</span>
        </button>
      ) : (
        <button
          onClick={() => onJoinGroup(group.id)}
          className="mt-4 w-full bg-blue-500 text-white rounded-lg py-2 hover:bg-blue-600 transition-colors"
        >
          Join Group
        </button>
      )}

      <LeaveGroupDialog
        isOpen={showLeaveDialog}
        onClose={() => setShowLeaveDialog(false)}
        onConfirm={handleLeaveGroup}
        group={group}
        isCreator={isCreator}
      />
    </div>
  );
}