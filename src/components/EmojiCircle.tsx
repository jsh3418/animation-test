import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface EmojiCircleProps {
  body: { position: { x: number; y: number } };
  emoji: string;
  radius: number;
}

const EmojiCircle: React.FC<EmojiCircleProps> = ({ body, emoji, radius }) => {
  const { x, y } = body.position;
  const diameter = radius * 2;

  return (
    <View
      style={[
        styles.circle,
        {
          left: x - radius,
          top: y - radius,
          width: diameter,
          height: diameter,
          borderRadius: radius,
        },
      ]}
    >
      <Text style={styles.emoji}>{emoji}</Text>
    </View>
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

export default React.memo(EmojiCircle);
