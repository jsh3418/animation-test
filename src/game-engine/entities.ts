import Matter from 'matter-js';
import EmojiCircle from '../components/EmojiCircle';
import type { BallDef } from '../physics/createBodies';

export function createEntities(engine: Matter.Engine, balls: BallDef[]) {
  const entities: Record<string, any> = {
    physics: { engine, world: engine.world },
  };

  balls.forEach((ball, i) => {
    entities[`ball-${i}`] = {
      body: ball.body,
      emoji: ball.emoji,
      radius: ball.radius,
      renderer: EmojiCircle,
    };
  });

  return entities;
}
