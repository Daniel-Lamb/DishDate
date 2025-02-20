import { Bell, Calendar, Star, Package, Info } from 'lucide-react';
import { Notification } from '../../types/notifications';
import { formatDistanceToNow } from '../../utils/date';

interface NotificationHistoryProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onDelete: (id: string) => void;
}

export function NotificationHistory({
  notifications,
  onMarkAsRead,
  onDelete
}: NotificationHistoryProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case 'event':
        return Calendar;
      case 'restaurant':
        return Star;
      case 'delivery':
        return Package;
      default:
        return Bell;
    }
  };

  const groupedNotifications = notifications.reduce((groups, notification) => {
    const date = new Date(notification.timestamp).toLocaleDateString();
    return {
      ...groups,
      [date]: [...(groups[date] || []), notification]
    };
  }, {} as Record<string, Notification[]>);

  return (
    <div className="space-y-6">
      {Object.entries(groupedNotifications).map(([date, items]) => (
        <div key={date}>
          <h3 className="text-sm font-medium text-gray-500 mb-3">{date}</h3>
          <div className="space-y-3">
            {items.map((notification) => {
              const Icon = getIcon(notification.type);
              return (
                <div
                  key={notification.id}
                  className={`flex items-start gap-3 p-4 rounded-lg ${
                    notification.read ? 'bg-gray-50' : 'bg-blue-50'
                  }`}
                >
                  <Icon className="w-5 h-5 text-gray-500 mt-1" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium">{notification.title}</p>
                    <p className="text-sm text-gray-600 mt-1">
                      {notification.message}
                    </p>
                    <div className="flex items-center gap-4 mt-2">
                      <button
                        onClick={() => onMarkAsRead(notification.id)}
                        className="text-sm text-blue-500 hover:text-blue-600"
                      >
                        {notification.read ? 'Mark as unread' : 'Mark as read'}
                      </button>
                      <button
                        onClick={() => onDelete(notification.id)}
                        className="text-sm text-red-500 hover:text-red-600"
                      >
                        Delete
                      </button>
                      <span className="text-sm text-gray-500">
                        {formatDistanceToNow(new Date(notification.timestamp))}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}