import { useEffect, useMemo } from 'react';
import Matter from 'matter-js';
import { createEngine } from '../physics/engine';
import { createBodies, BallDef } from '../physics/createBodies';

export function usePhysicsEngine(screenWidth: number, screenHeight: number) {
  const result = useMemo(() => {
    if (screenWidth === 0 || screenHeight === 0) {
      return { engine: null as Matter.Engine | null, balls: [] as BallDef[], walls: [] as Matter.Body[] };
    }
    const engine = createEngine();
    const { balls, walls } = createBodies(screenWidth, screenHeight);
    Matter.Composite.add(engine.world, [
      ...balls.map((b) => b.body),
      ...walls,
    ]);
    return { engine, balls, walls };
  }, [screenWidth, screenHeight]);

  useEffect(() => {
    return () => {
      if (result.engine) {
        Matter.Composite.clear(result.engine.world, false);
        Matter.Engine.clear(result.engine);
      }
    };
  }, [result.engine]);

  return result;
}
