import { Star } from 'lucide-react';
import { Restaurant } from '../../types/restaurant';

interface RestaurantReviewsProps {
  restaurant: Restaurant;
}

export function RestaurantReviews({ restaurant }: RestaurantReviewsProps) {
  // Mock reviews - in a real app, these would come from an API
  const mockReviews = [
    {
      id: '1',
      author: 'John D.',
      rating: 5,
      date: '2 days ago',
      content: 'Amazing food and atmosphere! The service was exceptional.',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop'
    },
    {
      id: '2',
      author: 'Sarah M.',
      rating: 4,
      date: '1 week ago',
      content: 'Great experience overall. Would definitely come back!',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop'
    }
  ];

  return (
    <div className="p-4">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <Star className="w-5 h-5 fill-yellow-400 stroke-yellow-400" />
          <span className="text-lg font-medium">{restaurant.rating}</span>
        </div>
        <p className="text-gray-500">Based on recent ratings</p>
      </div>

      <div className="space-y-4">
        {mockReviews.map(review => (
          <div key={review.id} className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3 mb-3">
              <img
                src={review.avatar}
                alt={review.author}
                className="w-8 h-8 rounded-full object-cover"
              />
              <div>
                <h4 className="font-medium">{review.author}</h4>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <div className="flex">
                    {Array(review.rating)
                      .fill(null)
                      .map((_, i) => (
                        <Star
                          key={i}
                          className="w-3 h-3 fill-yellow-400 stroke-yellow-400"
                        />
                      ))}
                  </div>
                  <span>•</span>
                  <span>{review.date}</span>
                </div>
              </div>
            </div>
            <p className="text-gray-600">{review.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}