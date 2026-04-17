import { useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const TAB_BAR_HEIGHT = 49;

export function useScreenDimensions() {
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const availableHeight = height - insets.top - insets.bottom - TAB_BAR_HEIGHT;

  return { width, height: availableHeight, insets };
}
