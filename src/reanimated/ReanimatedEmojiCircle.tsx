import React from 'react';
import { Text, StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, useDerivedValue } from 'react-native-reanimated';
import type { SharedValue } from 'react-native-reanimated';

interface ReanimatedEmojiCircleProps {
  index: number;
  positions: SharedValue<number[]>;
  emoji: string;
  radius: number;
}

const ReanimatedEmojiCircle: React.FC<ReanimatedEmojiCircleProps> = ({
  index,
  positions,
  emoji,
  radius,
}) => {
  const diameter = radius * 2;

  const x = useDerivedValue(() => positions.value[index * 2] ?? 0);
  const y = useDerivedValue(() => positions.value[index * 2 + 1] ?? 0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: x.value - radius },
      { translateY: y.value - radius },
    ],
  }));

  return (
    <Animated.View style={[styles.circle, { width: diameter, height: diameter, borderRadius: radius }, animatedStyle]}>
      <Text style={styles.emoji}>{emoji}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  circle: {
    position: 'absolute',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emoji: {
    fontSize: 18,
  },
});

export default React.memo(ReanimatedEmojiCircle);
