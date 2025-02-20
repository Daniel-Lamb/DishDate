import { ReactNode } from 'react';

interface FilterSectionProps {
  title: string;
  children: ReactNode;
}

export function FilterSection({ title, children }: FilterSectionProps) {
  return (
    <div className="mb-4">
      <h3 className="font-medium mb-2 text-gray-700">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {children}
      </div>
    </div>
  );
}