import { useState } from 'react';
import { CreditCard, Plus, Clock } from 'lucide-react';
import { PaymentMethod, Transaction } from '../../../types/payment';
import { AddPaymentDialog } from './AddPaymentDialog';
import { TransactionHistory } from './TransactionHistory';
import { mockTransactions } from '../../../data/mockTransactions';

const mockPaymentMethods: PaymentMethod[] = [
  {
    id: '1',
    type: 'card',
    last4: '4242',
    expiryMonth: '12',
    expiryYear: '2024',
    brand: 'visa',
    isDefault: true
  },
  {
    id: '2',
    type: 'card',
    last4: '8888',
    expiryMonth: '08',
    expiryYear: '2025',
    brand: 'mastercard',
    isDefault: false
  }
];

export function PaymentMethods() {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>(mockPaymentMethods);
  const [transactions] = useState<Transaction[]>(mockTransactions);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [activeTab, setActiveTab] = useState<'methods' | 'history'>('methods');

  const handleSetDefault = (id: string) => {
    setPaymentMethods(methods =>
      methods.map(method => ({
        ...method,
        isDefault: method.id === id
      }))
    );
  };

  const handleRemove = (id: string) => {
    setPaymentMethods(methods =>
      methods.filter(method => method.id !== id)
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex gap-4">
          <button
            onClick={() => setActiveTab('methods')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'methods'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            Payment Methods
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'history'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            Transaction History
          </button>
        </div>
      </div>

      {activeTab === 'methods' ? (
        <div className="space-y-4">
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <CreditCard className="w-5 h-5 text-gray-500" />
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium">
                      {method.brand.charAt(0).toUpperCase() + method.brand.slice(1)}
                    </p>
                    <p className="text-sm text-gray-500">
                      •••• {method.last4}
                    </p>
                    {method.isDefault && (
                      <span className="px-2 py-0.5 bg-blue-100 text-blue-600 text-xs rounded-full">
                        Default
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">
                    Expires {method.expiryMonth}/{method.expiryYear}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {!method.isDefault && (
                  <button
                    onClick={() => handleSetDefault(method.id)}
                    className="px-3 py-1 text-sm text-blue-500 hover:text-blue-600"
                  >
                    Set Default
                  </button>
                )}
                <button
                  onClick={() => handleRemove(method.id)}
                  className="px-3 py-1 text-sm text-red-500 hover:text-red-600"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <button
            onClick={() => setShowAddDialog(true)}
            className="w-full flex items-center justify-center gap-2 p-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 hover:text-gray-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>Add Payment Method</span>
          </button>
        </div>
      ) : (
        <TransactionHistory transactions={transactions} />
      )}

      <AddPaymentDialog
        isOpen={showAddDialog}
        onClose={() => setShowAddDialog(false)}
        onAdd={(newMethod) => {
          setPaymentMethods([...paymentMethods, newMethod]);
          setShowAddDialog(false);
        }}
      />
    </div>
  );
}