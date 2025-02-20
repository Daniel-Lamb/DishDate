export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  image: string;
  description: string;
  capacity: number;
  currentAttendees: number;
  status: 'upcoming' | 'canceled' | 'full';
  price?: number;
  organizer: string;
}

export interface RSVP {
  id: string;
  eventId: string;
  userId: string;
  status: 'confirmed' | 'waitlist' | 'canceled';
  timestamp: string;
}