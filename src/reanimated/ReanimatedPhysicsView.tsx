import React from 'react';
import { View } from 'react-native';
import type { SharedValue } from 'react-native-reanimated';
import type { BallDef } from '../physics/createBodies';
import ReanimatedEmojiCircle from './ReanimatedEmojiCircle';

interface ReanimatedPhysicsViewProps {
  positions: SharedValue<number[]>;
  balls: BallDef[];
  width: number;
  height: number;
}

export default function ReanimatedPhysicsView({ positions, balls, width, height }: ReanimatedPhysicsViewProps) {
  return (
    <View style={{ width, height, overflow: 'hidden' }}>
      {balls.map((ball, i) => (
        <ReanimatedEmojiCircle
          key={i}
          index={i}
          positions={positions}
          emoji={ball.emoji}
          radius={ball.radius}
        />
      ))}
    </View>
  );
}
