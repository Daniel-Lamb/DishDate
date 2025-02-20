import { Transaction } from '../../../types/payment';
import { formatDistanceToNow } from '../../../utils/date';

interface TransactionHistoryProps {
  transactions: Transaction[];
}

export function TransactionHistory({ transactions }: TransactionHistoryProps) {
  return (
    <div className="space-y-4">
      {transactions.map((transaction) => (
        <div
          key={transaction.id}
          className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
        >
          <div>
            <p className="font-medium">{transaction.description}</p>
            <div className="flex items-center gap-2 mt-1">
              <p className="text-sm text-gray-500">
                {formatDistanceToNow(new Date(transaction.date))}
              </p>
              <span className="text-gray-300">•</span>
              <p className="text-sm text-gray-500">
                {transaction.paymentMethod}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className={`font-medium ${
              transaction.type === 'refund' ? 'text-green-600' : ''
            }`}>
              {transaction.type === 'refund' ? '+' : '-'}${transaction.amount.toFixed(2)}
            </p>
            <p className={`text-sm ${
              transaction.status === 'completed'
                ? 'text-green-600'
                : transaction.status === 'pending'
                ? 'text-yellow-600'
                : 'text-red-600'
            }`}>
              {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}