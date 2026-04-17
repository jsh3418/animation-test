import React, { useState, useMemo } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { GameEngine } from 'react-native-game-engine';
import { useAccelerometer } from '@/src/hooks/useAccelerometer';
import { usePhysicsEngine } from '@/src/hooks/usePhysicsEngine';
import { useScreenDimensions } from '@/src/hooks/useScreenDimensions';
import { createEntities } from '@/src/game-engine/entities';
import { createAccelerometerSystem, PhysicsSystem } from '@/src/game-engine/systems';
import { useSkiaPhysicsBridge } from '@/src/skia/useSkiaPhysicsBridge';
import SkiaPhysicsCanvas from '@/src/skia/SkiaPhysicsCanvas';
import ReanimatedPhysicsView from '@/src/reanimated/ReanimatedPhysicsView';

type Mode = 'gameengine' | 'reanimated' | 'skia';

function GameEngineContent({ width, height }: { width: number; height: number }) {
  const { engine, balls } = usePhysicsEngine(width, height);
  const accelRef = useAccelerometer(16);

  const entities = useMemo(() => {
    if (!engine) return {};
    return createEntities(engine, balls);
  }, [engine, balls]);

  const systems = useMemo(() => {
    return [createAccelerometerSystem(accelRef), PhysicsSystem];
  }, [accelRef]);

  if (!engine) return null;

  return (
    <GameEngine
      style={{ width, height }}
      entities={entities}
      systems={systems}
      running={true}
    />
  );
}

function ReanimatedContent({ width, height }: { width: number; height: number }) {
  const { engine, balls } = usePhysicsEngine(width, height);
  const accelRef = useAccelerometer(16);
  const { positions, balls: reanimatedBalls } = useSkiaPhysicsBridge(engine, balls, accelRef);

  if (!engine) return null;

  return (
    <ReanimatedPhysicsView positions={positions} balls={reanimatedBalls} width={width} height={height} />
  );
}

function SkiaContent({ width, height }: { width: number; height: number }) {
  const { engine, balls } = usePhysicsEngine(width, height);
  const accelRef = useAccelerometer(16);
  const { positions, balls: skiaBalls } = useSkiaPhysicsBridge(engine, balls, accelRef);

  if (!engine) return null;

  return (
    <SkiaPhysicsCanvas positions={positions} balls={skiaBalls} width={width} height={height} />
  );
}

export default function MainScreen() {
  const [mode, setMode] = useState<Mode>('gameengine');
  const { width, height } = useScreenDimensions();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={{ width, height, flex: 1 }}>
        {mode === 'gameengine' && <GameEngineContent width={width} height={height} />}
        {mode === 'reanimated' && <ReanimatedContent width={width} height={height} />}
        {mode === 'skia' && <SkiaContent width={width} height={height} />}
      </View>
      <View style={[styles.tabBar, { paddingBottom: insets.bottom }]}>
        <TouchableOpacity
          style={[styles.tab, mode === 'gameengine' && styles.tabActive]}
          onPress={() => setMode('gameengine')}
        >
          <Text style={[styles.tabText, mode === 'gameengine' && styles.tabTextActive]}>
            GameEngine
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, mode === 'reanimated' && styles.tabActive]}
          onPress={() => setMode('reanimated')}
        >
          <Text style={[styles.tabText, mode === 'reanimated' && styles.tabTextActive]}>
            Reanimated
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, mode === 'skia' && styles.tabActive]}
          onPress={() => setMode('skia')}
        >
          <Text style={[styles.tabText, mode === 'skia' && styles.tabTextActive]}>
            Skia
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a1a2e' },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#111',
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  tabActive: {
    borderTopWidth: 2,
    borderTopColor: '#6366f1',
  },
  tabText: {
    color: '#888',
    fontSize: 14,
    fontWeight: '600',
  },
  tabTextActive: {
    color: '#6366f1',
  },
});
