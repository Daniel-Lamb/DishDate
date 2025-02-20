export type TabId = 'discover' | 'saved' | 'events-groups' | 'profile';
// Commented out 'map' from TabId type
// export type TabId = 'discover' | 'map' | 'saved' | 'events-groups' | 'profile';

export interface Tab {
  id: TabId;
  label: string;
  icon: string;
}