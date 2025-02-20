export interface PrivacyPreferences {
  profileVisibility: 'public' | 'private';
  locationSharing: boolean;
  swipeHistoryRetention: boolean;
  pushNotifications: boolean;
  twoFactorAuth: boolean;
}