import { Bell, Mail, MessageSquare, Clock } from 'lucide-react';
import { useState } from 'react';
import { NotificationSettings } from '../../types/notifications';
import { TimeRangePicker } from './TimeRangePicker';

interface NotificationPreferencesProps {
  settings: NotificationSettings;
  onUpdate: (settings: NotificationSettings) => void;
}

export function NotificationPreferences({ settings, onUpdate }: NotificationPreferencesProps) {
  const [localSettings, setLocalSettings] = useState(settings);

  const handleToggle = (key: keyof NotificationSettings['types']) => {
    const newSettings = {
      ...localSettings,
      types: {
        ...localSettings.types,
        [key]: !localSettings.types[key]
      }
    };
    setLocalSettings(newSettings);
    onUpdate(newSettings);
  };

  const handleMethodChange = (method: 'push' | 'email' | 'sms') => {
    const newSettings = {
      ...localSettings,
      methods: {
        ...localSettings.methods,
        [method]: !localSettings.methods[method]
      }
    };
    setLocalSettings(newSettings);
    onUpdate(newSettings);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Notification Types</h3>
        <div className="space-y-4">
          {Object.entries(localSettings.types).map(([key, enabled]) => (
            <div key={key} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="font-medium">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                  <p className="text-sm text-gray-500">
                    Get notified about {key.toLowerCase()} updates
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleToggle(key as keyof NotificationSettings['types'])}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  enabled ? 'bg-blue-500' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    enabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Delivery Methods</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => handleMethodChange('push')}
              className={`flex-1 p-4 rounded-lg border ${
                localSettings.methods.push
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200'
              }`}
            >
              <Bell className="w-5 h-5 mx-auto mb-2" />
              <p className="text-sm font-medium">Push</p>
            </button>
            <button
              onClick={() => handleMethodChange('email')}
              className={`flex-1 p-4 rounded-lg border ${
                localSettings.methods.email
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200'
              }`}
            >
              <Mail className="w-5 h-5 mx-auto mb-2" />
              <p className="text-sm font-medium">Email</p>
            </button>
            <button
              onClick={() => handleMethodChange('sms')}
              className={`flex-1 p-4 rounded-lg border ${
                localSettings.methods.sms
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200'
              }`}
            >
              <MessageSquare className="w-5 h-5 mx-auto mb-2" />
              <p className="text-sm font-medium">SMS</p>
            </button>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Quiet Hours</h3>
        <div className="flex items-center gap-3 mb-4">
          <Clock className="w-5 h-5 text-gray-500" />
          <div>
            <p className="font-medium">Do Not Disturb</p>
            <p className="text-sm text-gray-500">
              Pause notifications during specific hours
            </p>
          </div>
          <button
            onClick={() => {
              const newSettings = {
                ...localSettings,
                quietHours: {
                  ...localSettings.quietHours,
                  enabled: !localSettings.quietHours.enabled
                }
              };
              setLocalSettings(newSettings);
              onUpdate(newSettings);
            }}
            className={`relative ml-auto inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              localSettings.quietHours.enabled ? 'bg-blue-500' : 'bg-gray-200'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                localSettings.quietHours.enabled ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
        {localSettings.quietHours.enabled && (
          <TimeRangePicker
            start={localSettings.quietHours.start}
            end={localSettings.quietHours.end}
            onChange={(start, end) => {
              const newSettings = {
                ...localSettings,
                quietHours: {
                  ...localSettings.quietHours,
                  start,
                  end
                }
              };
              setLocalSettings(newSettings);
              onUpdate(newSettings);
            }}
          />
        )}
      </div>
    </div>
  );
}