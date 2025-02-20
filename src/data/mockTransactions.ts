import { Transaction } from '../types/payment';

export const mockTransactions: Transaction[] = [
  {
    id: '1',
    date: '2024-03-10T15:30:00Z',
    amount: 75.00,
    description: 'Wine Tasting Event Ticket',
    type: 'payment',
    status: 'completed',
    paymentMethod: 'Visa •••• 4242'
  },
  {
    id: '2',
    date: '2024-03-08T12:45:00Z',
    amount: 25.00,
    description: 'Food Festival Entry',
    type: 'payment',
    status: 'completed',
    paymentMethod: 'Mastercard •••• 8888'
  },
  {
    id: '3',
    date: '2024-03-05T18:20:00Z',
    amount: 15.00,
    description: 'Canceled Event Refund',
    type: 'refund',
    status: 'completed',
    paymentMethod: 'Original Payment'
  }
];