interface TimeRangePickerProps {
  start: string;
  end: string;
  onChange: (start: string, end: string) => void;
}

export function TimeRangePicker({ start, end, onChange }: TimeRangePickerProps) {
  return (
    <div className="flex items-center gap-4">
      <div>
        <label htmlFor="start-time" className="block text-sm text-gray-600 mb-1">
          Start Time
        </label>
        <input
          type="time"
          id="start-time"
          value={start}
          onChange={(e) => onChange(e.target.value, end)}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      <div>
        <label htmlFor="end-time" className="block text-sm text-gray-600 mb-1">
          End Time
        </label>
        <input
          type="time"
          id="end-time"
          value={end}
          onChange={(e) => onChange(start, e.target.value)}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
    </div>
  );
}