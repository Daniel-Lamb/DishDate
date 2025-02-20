export interface GroupMember {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'offline';
  friendCode: string;
}

export interface Group {
  id: string;
  name: string;
  createdBy: string;
  members: GroupMember[];
  preferences: {
    maxDistance: number;
    cuisineTypes: string[];
  };
  inviteCode: string;
  votes: Record<string, { restaurantId: string; vote: 'like' | 'dislike' }[]>;
}