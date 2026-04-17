import { useEffect } from 'react';
import { useSharedValue } from 'react-native-reanimated';
import Matter from 'matter-js';
import type { BallDef } from '../physics/createBodies';
import type { AccelData } from '../hooks/useAccelerometer';
import { GRAVITY_SCALE, BALL_COUNT } from '../physics/constants';
import type { SharedValue } from 'react-native-reanimated';

export interface SkiaPhysicsState {
  positions: SharedValue<number[]>;
  balls: BallDef[];
}

export function useSkiaPhysicsBridge(
  engine: Matter.Engine | null,
  balls: BallDef[],
  accelRef: React.MutableRefObject<AccelData>,
): SkiaPhysicsState {
  // Flat array: [x0, y0, x1, y1, ...] — 2 values per ball
  const positions = useSharedValue<number[]>(new Array(BALL_COUNT * 2).fill(0));

  // Initialize positions
  useEffect(() => {
    const arr = new Array(BALL_COUNT * 2);
    balls.forEach((ball, i) => {
      arr[i * 2] = ball.body.position.x;
      arr[i * 2 + 1] = ball.body.position.y;
    });
    positions.value = arr;
  }, [balls]);

  // Physics loop on JS thread
  useEffect(() => {
    if (!engine) return;

    let lastTime = performance.now();
    let animFrameId: number;

    const step = () => {
      const now = performance.now();
      const delta = Math.min(now - lastTime, 32);
      lastTime = now;

      const { x, y } = accelRef.current;
      engine.gravity.x = -x * GRAVITY_SCALE;
      engine.gravity.y = y * GRAVITY_SCALE;

      Matter.Engine.update(engine, delta);

      const arr = new Array(balls.length * 2);
      for (let i = 0; i < balls.length; i++) {
        arr[i * 2] = balls[i].body.position.x;
        arr[i * 2 + 1] = balls[i].body.position.y;
      }
      positions.value = arr;

      animFrameId = requestAnimationFrame(step);
    };

    animFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animFrameId);
  }, [engine, balls]);

  return { positions, balls };
}
