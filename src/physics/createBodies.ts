import Matter from 'matter-js';
import {
  BALL_RADIUS,
  BALL_COUNT,
  WALL_THICKNESS,
  RESTITUTION,
  FRICTION,
  FRICTION_AIR,
  EMOJI_LIST,
} from './constants';

export interface BallDef {
  body: Matter.Body;
  emoji: string;
  radius: number;
}

export function createBodies(screenWidth: number, screenHeight: number) {
  const balls: BallDef[] = [];

  for (let i = 0; i < BALL_COUNT; i++) {
    const x = BALL_RADIUS + Math.random() * (screenWidth - BALL_RADIUS * 2);
    const y = BALL_RADIUS + Math.random() * (screenHeight - BALL_RADIUS * 2);

    const body = Matter.Bodies.circle(x, y, BALL_RADIUS, {
      restitution: RESTITUTION,
      friction: FRICTION,
      frictionAir: FRICTION_AIR,
      label: `ball-${i}`,
    });

    balls.push({ body, emoji: EMOJI_LIST[i % EMOJI_LIST.length], radius: BALL_RADIUS });
  }

  const wallOptions: Matter.IChamferableBodyDefinition = { isStatic: true, restitution: 0.5 };
  const walls = [
    // Top
    Matter.Bodies.rectangle(
      screenWidth / 2,
      -WALL_THICKNESS / 2,
      screenWidth + WALL_THICKNESS * 2,
      WALL_THICKNESS,
      wallOptions,
    ),
    // Bottom
    Matter.Bodies.rectangle(
      screenWidth / 2,
      screenHeight + WALL_THICKNESS / 2,
      screenWidth + WALL_THICKNESS * 2,
      WALL_THICKNESS,
      wallOptions,
    ),
    // Left
    Matter.Bodies.rectangle(
      -WALL_THICKNESS / 2,
      screenHeight / 2,
      WALL_THICKNESS,
      screenHeight + WALL_THICKNESS * 2,
      wallOptions,
    ),
    // Right
    Matter.Bodies.rectangle(
      screenWidth + WALL_THICKNESS / 2,
      screenHeight / 2,
      WALL_THICKNESS,
      screenHeight + WALL_THICKNESS * 2,
      wallOptions,
    ),
  ];

  return { balls, walls };
}
