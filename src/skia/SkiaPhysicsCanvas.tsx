import React, { useMemo } from 'react';
import { Canvas, Circle, Paragraph, Skia, TextAlign } from '@shopify/react-native-skia';
import { useDerivedValue } from 'react-native-reanimated';
import type { SharedValue } from 'react-native-reanimated';
import type { BallDef } from '../physics/createBodies';
import { BALL_RADIUS } from '../physics/constants';

const fontSize = BALL_RADIUS * 1.2;

function buildEmojiParagraph(emoji: string) {
  const style = {
    textAlign: TextAlign.Center,
  };
  const textStyle = {
    fontSize,
  };
  const builder = Skia.ParagraphBuilder.Make(style);
  builder.pushStyle(textStyle);
  builder.addText(emoji);
  builder.pop();
  const p = builder.build();
  p.layout(BALL_RADIUS * 2);
  return p;
}

interface SkiaBallProps {
  index: number;
  positions: SharedValue<number[]>;
  emoji: string;
  radius: number;
}

function SkiaBall({ index, positions, emoji, radius }: SkiaBallProps) {
  const paragraph = useMemo(() => buildEmojiParagraph(emoji), [emoji]);

  const cx = useDerivedValue(() => positions.value[index * 2] ?? 0);
  const cy = useDerivedValue(() => positions.value[index * 2 + 1] ?? 0);
  const textX = useDerivedValue(() => (positions.value[index * 2] ?? 0) - radius);
  const textY = useDerivedValue(() => (positions.value[index * 2 + 1] ?? 0) - fontSize * 0.55);

  return (
    <>
      <Circle cx={cx} cy={cy} r={radius} color="rgba(255,255,255,0.15)" />
      <Circle cx={cx} cy={cy} r={radius} color="rgba(255,255,255,0.3)" style="stroke" strokeWidth={2} />
      <Paragraph paragraph={paragraph} x={textX} y={textY} width={radius * 2} />
    </>
  );
}

interface SkiaPhysicsCanvasProps {
  positions: SharedValue<number[]>;
  balls: BallDef[];
  width: number;
  height: number;
}

export default function SkiaPhysicsCanvas({ positions, balls, width, height }: SkiaPhysicsCanvasProps) {
  return (
    <Canvas style={{ width, height }}>
      {balls.map((ball, i) => (
        <SkiaBall key={i} index={i} positions={positions} emoji={ball.emoji} radius={ball.radius} />
      ))}
    </Canvas>
  );
}
