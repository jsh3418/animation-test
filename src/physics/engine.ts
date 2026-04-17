import Matter from 'matter-js';

export function createEngine() {
  const engine = Matter.Engine.create({
    enableSleeping: false,
  });
  engine.gravity.x = 0;
  engine.gravity.y = 0;
  return engine;
}
