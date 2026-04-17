import Matter from 'matter-js';
import { GRAVITY_SCALE } from '../physics/constants';
import type { MutableRefObject } from 'react';
import type { AccelData } from '../hooks/useAccelerometer';

export function createAccelerometerSystem(accelRef: MutableRefObject<AccelData>) {
  return (entities: any) => {
    const engine = entities.physics.engine as Matter.Engine;
    const { x, y } = accelRef.current;
    engine.gravity.x = -x * GRAVITY_SCALE;
    engine.gravity.y = y * GRAVITY_SCALE;
    return entities;
  };
}

export function PhysicsSystem(entities: any, { time }: any) {
  const engine = entities.physics.engine as Matter.Engine;
  Matter.Engine.update(engine, Math.min(time.delta, 32));
  return entities;
}
