# animation-test

React Native에서 물리 기반 애니메이션을 렌더러별로 비교해보는 실험용 Expo 프로젝트입니다.

## 구성

- **물리 엔진**: [Matter.js](https://brm.io/matter-js/)
- **센서**: `expo-sensors` (Accelerometer)
- **렌더러 비교**
  - `react-native-game-engine` 기반 (`src/game-engine/`)
  - `react-native-reanimated` 기반 (`src/reanimated/`)
  - `@shopify/react-native-skia` 기반 (`src/skia/`)

## 실행

```bash
npm install
npm run ios      # iOS
npm run android  # Android
```

## 디렉토리

```
src/
├── components/   # game-engine 렌더러용 Ball 컴포넌트
├── hooks/        # 센서·물리·화면 크기 훅
├── physics/      # Matter.js 엔진 및 바디 생성
├── game-engine/  # react-native-game-engine 렌더링
├── reanimated/   # Reanimated 렌더링
└── skia/         # Skia 렌더링
```
