import { PanInfo } from 'framer-motion';
import { useState } from 'react';

interface SwipeGesturesProps {
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  onSwipeUp: () => void;
}

export function useSwipeGestures({
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp
}: SwipeGesturesProps) {
  const [swipeAnimation, setSwipeAnimation] = useState({});

  const handleDragEnd = (_: any, info: PanInfo) => {
    const swipeThreshold = 100;
    const xOffset = info.offset.x;
    const yOffset = info.offset.y;

    if (Math.abs(xOffset) > swipeThreshold) {
      const direction = xOffset > 0 ? 'right' : 'left';
      setSwipeAnimation({
        x: xOffset > 0 ? 1000 : -1000,
        transition: { duration: 0.5 }
      });
      
      if (direction === 'right') {
        onSwipeRight();
      } else {
        onSwipeLeft();
      }
    } else if (yOffset < -swipeThreshold) {
      setSwipeAnimation({
        y: -1000,
        transition: { duration: 0.5 }
      });
      onSwipeUp();
    } else {
      setSwipeAnimation({
        x: 0,
        y: 0,
        transition: { duration: 0.5 }
      });
    }
  };

  return {
    handleDragEnd,
    swipeAnimation
  };
}