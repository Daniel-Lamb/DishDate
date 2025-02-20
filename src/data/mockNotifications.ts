import { Notification } from '../types/notifications';

export const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'event',
    title: 'New Food Festival',
    message: 'Don\'t miss the upcoming Street Food Festival this weekend!',
    timestamp: '2024-03-10T10:00:00Z',
    read: false,
    link: '/events/1'
  },
  {
    id: '2',
    type: 'restaurant',
    title: 'New Restaurant Added',
    message: 'Check out the new Italian restaurant in your area!',
    timestamp: '2024-03-09T15:30:00Z',
    read: true,
    link: '/restaurants/2'
  },
  {
    id: '3',
    type: 'waitlist',
    title: 'Spot Available',
    message: 'A spot opened up at the Wine Tasting event!',
    timestamp: '2024-03-09T09:15:00Z',
    read: false,
    link: '/events/3'
  }
];