import * as Dialog from '@radix-ui/react-dialog';
import { X, Download, Check } from 'lucide-react';
import { useState } from 'react';

interface ExportDataDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ExportDataDialog({ isOpen, onClose }: ExportDataDialogProps) {
  const [isExporting, setIsExporting] = useState(false);
  const [exportComplete, setExportComplete] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setExportComplete(true);
      // In a real app, we would handle the data export here
    } catch (error) {
      console.error('Error exporting data:', error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 w-[90vw] max-w-md">
          <div className="flex justify-between items-start mb-6">
            <Dialog.Title className="text-xl font-semibold text-gray-900">
              Export Data
            </Dialog.Title>
            <Dialog.Close className="text-gray-400 hover:text-gray-500">
              <X className="w-5 h-5" />
            </Dialog.Close>
          </div>

          <div className="space-y-4">
            <p className="text-gray-600">
              Your data export will include:
            </p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500" />
                Restaurant preferences and swipe history
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500" />
                Saved lists and favorites
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500" />
                Account settings and preferences
              </li>
            </ul>

            {exportComplete ? (
              <div className="flex items-center justify-center gap-2 p-4 bg-green-50 rounded-lg text-green-600">
                <Check className="w-5 h-5" />
                <span>Export complete! Check your email.</span>
              </div>
            ) : (
              <button
                onClick={handleExport}
                disabled={isExporting}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Download className="w-4 h-4" />
                <span>{isExporting ? 'Preparing export...' : 'Export Data'}</span>
              </button>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}