import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { Theme } from '@/styles/Theme';

export default function Toolbar({ children, style }: { children: React.ReactNode, style?: StyleProp<ViewStyle> }) {
  return (
    <View style={[styles.container, style]}>
      {children}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 10,
    backgroundColor: Theme.colors.background,

  },
});