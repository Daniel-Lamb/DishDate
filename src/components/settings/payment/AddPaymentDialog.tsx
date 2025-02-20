import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { useState } from 'react';
import { PaymentMethod } from '../../../types/payment';

interface AddPaymentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (method: PaymentMethod) => void;
}

export function AddPaymentDialog({ isOpen, onClose, onAdd }: AddPaymentDialogProps) {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryMonth, setExpiryMonth] = useState('');
  const [expiryYear, setExpiryYear] = useState('');
  const [cvc, setCvc] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // In a real app, we would tokenize the card details using a payment provider
      const newMethod: PaymentMethod = {
        id: String(Date.now()),
        type: 'card',
        last4: cardNumber.slice(-4),
        expiryMonth,
        expiryYear,
        brand: 'visa', // In a real app, this would be determined by the card number
        isDefault: false
      };

      onAdd(newMethod);
    } catch (error) {
      console.error('Error adding payment method:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 w-[90vw] max-w-md">
          <div className="flex justify-between items-start mb-6">
            <Dialog.Title className="text-xl font-semibold text-gray-900">
              Add Payment Method
            </Dialog.Title>
            <Dialog.Close className="text-gray-400 hover:text-gray-500">
              <X className="w-5 h-5" />
            </Dialog.Close>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="cardNumber"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Card Number
              </label>
              <input
                type="text"
                id="cardNumber"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, ''))}
                maxLength={16}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="1234 5678 9012 3456"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="expiry"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Expiry Date
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={expiryMonth}
                    onChange={(e) => setExpiryMonth(e.target.value.replace(/\D/g, ''))}
                    maxLength={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="MM"
                    required
                  />
                  <input
                    type="text"
                    value={expiryYear}
                    onChange={(e) => setExpiryYear(e.target.value.replace(/\D/g, ''))}
                    maxLength={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="YY"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="cvc"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  CVC
                </label>
                <input
                  type="text"
                  id="cvc"
                  value={cvc}
                  onChange={(e) => setCvc(e.target.value.replace(/\D/g, ''))}
                  maxLength={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="123"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Adding...' : 'Add Payment Method'}
            </button>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}