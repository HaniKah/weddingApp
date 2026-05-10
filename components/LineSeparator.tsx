import { View } from 'react-native';
import { Theme } from '@/styles/Theme';

export default function LineSeparator({ height = 1, color = Theme.colors.border, margin = 10 }: {
  height?: number,
  color?: string,
  margin?: number
}) {
  return (
    <View style={{ paddingHorizontal: 20 }}>
      <View style={{ height: height, flex: 1, backgroundColor: color, marginVertical: margin }} />
    </View>


  );
}