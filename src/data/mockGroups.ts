import { Group, GroupMember } from '../types/group';

export const mockMembers: GroupMember[] = [
  {
    id: '1',
    name: 'Alex Johnson',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=60',
    status: 'online',
    friendCode: 'AJ123'
  },
  {
    id: '2',
    name: 'Taylor Smith',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&auto=format&fit=crop&q=60',
    status: 'offline',
    friendCode: 'TS456'
  },
  {
    id: '3',
    name: 'Jordan Lee',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=60',
    status: 'online',
    friendCode: 'JL789'
  }
];

export const mockGroups: Group[] = [
  {
    id: '1',
    name: "Friday Night Dinner",
    createdBy: '1',
    members: mockMembers,
    preferences: {
      maxDistance: 10,
      cuisineTypes: ['Italian', 'Japanese']
    },
    inviteCode: 'DINNER123',
    votes: {}
  }
];