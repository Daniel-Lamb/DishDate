import { Award, Settings, History, Heart, Share2, Bell, Shield, CreditCard } from 'lucide-react';
import { NotificationsSection } from '../notifications/NotificationsSection';
import { PrivacySettings } from '../settings/privacy/PrivacySettings';
import { PaymentMethods } from '../settings/payment/PaymentMethods';
import { AchievementsSection } from '../achievements/AchievementsSection';
import { useState } from 'react';
import { BackButton } from '../BackButton';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: any;
  progress?: number;
  total?: number;
}

type ActiveSection = 'main' | 'notifications' | 'privacy' | 'payments' | 'achievements';

export function Profile() {
  const [activeSection, setActiveSection] = useState<ActiveSection>('main');
  
  const stats = [
    { label: 'Restaurants Visited', value: 12 },
    { label: 'Reviews Written', value: 8 },
    { label: 'Groups Joined', value: 3 },
    { label: 'Events Attended', value: 2 }
  ];

  const renderSection = () => {
    switch (activeSection) {
      case 'notifications':
        return (
          <>
            <div className="mb-6">
              <BackButton onClick={() => setActiveSection('main')} />
            </div>
            <NotificationsSection />
          </>
        );
      case 'privacy':
        return (
          <>
            <div className="mb-6">
              <BackButton onClick={() => setActiveSection('main')} />
            </div>
            <PrivacySettings />
          </>
        );
      case 'payments':
        return (
          <>
            <div className="mb-6">
              <BackButton onClick={() => setActiveSection('main')} />
            </div>
            <PaymentMethods />
          </>
        );
      case 'achievements':
        return (
          <>
            <div className="mb-6">
              <BackButton onClick={() => setActiveSection('main')} />
            </div>
            <AchievementsSection />
          </>
        );
      default:
        return (
          <>
            {/* Profile Header */}
            <div className="bg-white rounded-lg p-6 mb-4">
              <div className="flex items-center gap-4">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=60"
                  alt="Profile"
                  className="w-20 h-20 rounded-full object-cover"
                />
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">John Doe</h2>
                  <p className="text-gray-500">Food Enthusiast</p>
                  <p className="text-sm text-gray-400 mt-1">Member since March 2024</p>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-lg p-4">
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="grid gap-2">
              <button
                onClick={() => setActiveSection('achievements')}
                className="w-full p-4 bg-white rounded-lg flex items-center gap-3 text-gray-700 hover:bg-gray-50"
              >
                <Award className="w-5 h-5" />
                <span>Achievements</span>
              </button>
              <button
                onClick={() => setActiveSection('notifications')}
                className="w-full p-4 bg-white rounded-lg flex items-center gap-3 text-gray-700 hover:bg-gray-50"
              >
                <Bell className="w-5 h-5" />
                <span>Notifications</span>
              </button>
              <button
                onClick={() => setActiveSection('privacy')}
                className="w-full p-4 bg-white rounded-lg flex items-center gap-3 text-gray-700 hover:bg-gray-50"
              >
                <Shield className="w-5 h-5" />
                <span>Privacy Settings</span>
              </button>
              <button
                onClick={() => setActiveSection('payments')}
                className="w-full p-4 bg-white rounded-lg flex items-center gap-3 text-gray-700 hover:bg-gray-50"
              >
                <CreditCard className="w-5 h-5" />
                <span>Payment Methods</span>
              </button>
            </div>
          </>
        );
    }
  };

  return (
    <div className="h-[calc(100vh-8rem)] bg-white p-4 overflow-auto">
      <div className="max-w-2xl mx-auto">
        {renderSection()}
      </div>
    </div>
  );
}