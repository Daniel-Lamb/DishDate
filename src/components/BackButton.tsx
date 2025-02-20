import { ArrowLeft } from 'lucide-react';

interface BackButtonProps {
  onClick: () => void;
  label?: string;
}

export function BackButton({ onClick, label = 'Back' }: BackButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
      aria-label="Go back"
    >
      <ArrowLeft className="w-5 h-5" />
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
}