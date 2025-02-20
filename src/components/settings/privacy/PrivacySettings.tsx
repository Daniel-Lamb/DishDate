import { useState } from 'react';
import { Shield, MapPin, History, Bell, Download, Trash2, KeyRound } from 'lucide-react';
import { PrivacyPreferences } from '../../../types/privacy';
import { DeleteAccountDialog } from './DeleteAccountDialog';
import { ExportDataDialog } from './ExportDataDialog';

const defaultPreferences: PrivacyPreferences = {
  profileVisibility: 'public',
  locationSharing: true,
  swipeHistoryRetention: true,
  pushNotifications: true,
  twoFactorAuth: false
};

export function PrivacySettings() {
  const [preferences, setPreferences] = useState<PrivacyPreferences>(defaultPreferences);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showExportDialog, setShowExportDialog] = useState(false);

  const handleToggle = (key: keyof PrivacyPreferences) => {
    setPreferences(prev => ({
      ...prev,
      [key]: typeof prev[key] === 'boolean' ? !prev[key] : prev[key]
    }));
  };

  const handleVisibilityChange = (value: 'public' | 'private') => {
    setPreferences(prev => ({
      ...prev,
      profileVisibility: value
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Profile Visibility</h3>
        <div className="flex gap-4">
          <button
            onClick={() => handleVisibilityChange('public')}
            className={`flex-1 p-4 rounded-lg border ${
              preferences.profileVisibility === 'public'
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200'
            }`}
          >
            <p className="font-medium">Public</p>
            <p className="text-sm text-gray-500 mt-1">
              Friends can see your saved restaurants and lists
            </p>
          </button>
          <button
            onClick={() => handleVisibilityChange('private')}
            className={`flex-1 p-4 rounded-lg border ${
              preferences.profileVisibility === 'private'
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200'
            }`}
          >
            <p className="font-medium">Private</p>
            <p className="text-sm text-gray-500 mt-1">
              Only you can see your activity
            </p>
          </button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Data Permissions</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-gray-500" />
              <div>
                <p className="font-medium">Location Data</p>
                <p className="text-sm text-gray-500">
                  Used for finding restaurants near you
                </p>
              </div>
            </div>
            <button
              onClick={() => handleToggle('locationSharing')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                preferences.locationSharing ? 'bg-blue-500' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  preferences.locationSharing ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <History className="w-5 h-5 text-gray-500" />
              <div>
                <p className="font-medium">Swipe History</p>
                <p className="text-sm text-gray-500">
                  Store your restaurant preferences
                </p>
              </div>
            </div>
            <button
              onClick={() => handleToggle('swipeHistoryRetention')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                preferences.swipeHistoryRetention ? 'bg-blue-500' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  preferences.swipeHistoryRetention ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-gray-500" />
              <div>
                <p className="font-medium">Push Notifications</p>
                <p className="text-sm text-gray-500">
                  Receive updates about restaurants and events
                </p>
              </div>
            </div>
            <button
              onClick={() => handleToggle('pushNotifications')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                preferences.pushNotifications ? 'bg-blue-500' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  preferences.pushNotifications ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Security</h3>
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-3">
            <KeyRound className="w-5 h-5 text-gray-500" />
            <div>
              <p className="font-medium">Two-Factor Authentication</p>
              <p className="text-sm text-gray-500">
                Add an extra layer of security
              </p>
            </div>
          </div>
          <button
            onClick={() => handleToggle('twoFactorAuth')}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              preferences.twoFactorAuth ? 'bg-blue-500' : 'bg-gray-200'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                preferences.twoFactorAuth ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Data Management</h3>
        <div className="space-y-3">
          <button
            onClick={() => setShowExportDialog(true)}
            className="w-full flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Download className="w-5 h-5 text-gray-500" />
            <div className="flex-1 text-left">
              <p className="font-medium">Export Data</p>
              <p className="text-sm text-gray-500">
                Download a copy of your data
              </p>
            </div>
          </button>

          <button
            onClick={() => setShowDeleteDialog(true)}
            className="w-full flex items-center gap-3 p-4 bg-red-50 rounded-lg hover:bg-red-100 transition-colors text-red-600"
          >
            <Trash2 className="w-5 h-5" />
            <div className="flex-1 text-left">
              <p className="font-medium">Delete Account</p>
              <p className="text-sm">
                Permanently remove your account and data
              </p>
            </div>
          </button>
        </div>
      </div>

      <DeleteAccountDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
      />

      <ExportDataDialog
        isOpen={showExportDialog}
        onClose={() => setShowExportDialog(false)}
      />
    </div>
  );
}