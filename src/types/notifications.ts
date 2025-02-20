export interface NotificationSettings {
  types: {
    restaurantUpdates: boolean;
    eventNotifications: boolean;
    waitlistUpdates: boolean;
    generalUpdates: boolean;
  };
  methods: {
    push: boolean;
    email: boolean;
    sms: boolean;
  };
  quietHours: {
    enabled: boolean;
    start: string;
    end: string;
  };
}

export interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  link?: string;
}