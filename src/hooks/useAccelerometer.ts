import { useEffect, useRef } from 'react';
import { Accelerometer } from 'expo-sensors';

export interface AccelData {
  x: number;
  y: number;
}

export function useAccelerometer(updateIntervalMs = 16) {
  const dataRef = useRef<AccelData>({ x: 0, y: 0 });

  useEffect(() => {
    Accelerometer.setUpdateInterval(updateIntervalMs);
    const subscription = Accelerometer.addListener(({ x, y }) => {
      dataRef.current = { x, y };
    });
    return () => subscription.remove();
  }, [updateIntervalMs]);

  return dataRef;
}
