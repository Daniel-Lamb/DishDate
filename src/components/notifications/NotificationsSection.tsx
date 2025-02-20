import { useState } from 'react';
import { NotificationPreferences } from './NotificationPreferences';
import { NotificationHistory } from './NotificationHistory';
import { NotificationSettings, Notification } from '../../types/notifications';
import { mockNotifications } from '../../data/mockNotifications';

const defaultSettings: NotificationSettings = {
  types: {
    restaurantUpdates: true,
    eventNotifications: true,
    waitlistUpdates: true,
    generalUpdates: false
  },
  methods: {
    push: true,
    email: true,
    sms: false
  },
  quietHours: {
    enabled: false,
    start: '22:00',
    end: '07:00'
  }
};

export function NotificationsSection() {
  const [settings, setSettings] = useState<NotificationSettings>(defaultSettings);
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [activeTab, setActiveTab] = useState<'preferences' | 'history'>('preferences');

  const handleMarkAsRead = (id: string) => {
    setNotifications(notifications.map(notification =>
      notification.id === id
        ? { ...notification, read: !notification.read }
        : notification
    ));
  };

  const handleDelete = (id: string) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  const handleTestNotification = async () => {
    const newNotification: Notification = {
      id: String(Date.now()),
      type: 'test',
      title: 'Test Notification',
      message: 'This is a test notification to verify your settings.',
      timestamp: new Date().toISOString(),
      read: false
    };

    setNotifications([newNotification, ...notifications]);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex gap-4">
          <button
            onClick={() => setActiveTab('preferences')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'preferences'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            Preferences
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'history'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            History
          </button>
        </div>
        <button
          onClick={handleTestNotification}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Send Test Notification
        </button>
      </div>

      {activeTab === 'preferences' ? (
        <NotificationPreferences
          settings={settings}
          onUpdate={setSettings}
        />
      ) : (
        <NotificationHistory
          notifications={notifications}
          onMarkAsRead={handleMarkAsRead}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}