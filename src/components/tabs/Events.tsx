import { Event } from '../../types/event';
import { EventCard } from '../events/EventCard';

export function Events() {
  const upcomingEvents: Event[] = [
    {
      id: '1',
      title: 'Food Truck Festival',
      date: '2024-03-15',
      time: '12:00 PM - 8:00 PM',
      location: 'Downtown Plaza',
      image: 'https://images.unsplash.com/photo-1565123409695-7b5ef63a2efb?w=800&auto=format&fit=crop&q=60',
      description: 'Join us for a day of delicious food from local food trucks!',
      capacity: 500,
      currentAttendees: 450,
      status: 'upcoming',
      price: 10,
      organizer: 'City Food Events'
    },
    {
      id: '2',
      title: 'Wine Tasting Night',
      date: '2024-03-20',
      time: '6:00 PM - 9:00 PM',
      location: 'Bella Italia',
      image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&auto=format&fit=crop&q=60',
      description: 'Experience a curated selection of fine wines paired with artisanal cheeses.',
      capacity: 50,
      currentAttendees: 50,
      status: 'full',
      price: 75,
      organizer: 'Wine Enthusiasts Club'
    },
  ];

  return (
    <div className="h-[calc(100vh-8rem)] bg-gray-100 p-4 overflow-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Upcoming Events</h2>
      <div className="grid gap-4">
        {upcomingEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}