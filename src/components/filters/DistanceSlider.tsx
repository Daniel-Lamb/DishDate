import * as Slider from '@radix-ui/react-slider';

interface DistanceSliderProps {
  value: number;
  onChange: (value: number) => void;
}

export function DistanceSlider({ value, onChange }: DistanceSliderProps) {
  return (
    <div className="w-full px-2">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-gray-600">Distance</span>
        <span className="text-sm font-medium text-gray-900">{value} miles</span>
      </div>
      <Slider.Root
        className="relative flex items-center select-none touch-none w-full h-5"
        value={[value]}
        onValueChange={([newValue]) => onChange(newValue)}
        max={50}
        step={1}
      >
        <Slider.Track className="bg-gray-200 relative grow rounded-full h-[3px]">
          <Slider.Range className="absolute bg-blue-500 rounded-full h-full" />
        </Slider.Track>
        <Slider.Thumb
          className="block w-5 h-5 bg-white shadow-lg rounded-full hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Distance"
        />
      </Slider.Root>
    </div>
  );
}