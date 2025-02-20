import { Calendar, MapPin } from 'lucide-react';
import { Event } from '../../types/event';
import { RSVPButton } from './RSVPButton';
import { WaitlistButton } from './WaitlistButton';

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm">
      <img
        src={event.image}
        alt={event.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900">
            {event.title}
          </h3>
          {event.status === 'full' && (
            <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
              Full
            </span>
          )}
        </div>
        <div className="space-y-2 text-sm text-gray-600 mb-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{event.date}</span>
            <span className="text-gray-400">•</span>
            <span>{event.time}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span>{event.location}</span>
          </div>
          {event.price && (
            <p className="font-medium text-gray-900">
              ${event.price.toFixed(2)}
            </p>
          )}
        </div>
        {event.status === 'full' ? (
          <WaitlistButton
            event={event}
            onJoinWaitlist={() => {
              // Handle successful waitlist join
            }}
          />
        ) : (
          <RSVPButton
            event={event}
            onRSVP={() => {
              // Handle successful RSVP
            }}
          />
        )}
      </div>
    </div>
  );
}