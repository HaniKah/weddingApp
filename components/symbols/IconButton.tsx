import { Pressable, StyleSheet, View } from 'react-native';
import { IconSymbol } from '@/components/symbols/IconSymbol';
import { SFSymbols6_0 } from 'sf-symbols-typescript';
import { Theme } from '@/styles/Theme';
import { SymbolWeight } from 'expo-symbols';
import { Href, Link } from 'expo-router';

export function IconButton(
  {
    name,
    color = Theme.colors.primary,
    weight = 'bold',
    size = Theme.sizes.lg,
    onPress,
    href,
    removeBackground = false,

  }: {
    name: SFSymbols6_0,
    color?: string,
    weight?: SymbolWeight
    size?: number
    onPress?: () => void,
    href?: Href
    removeBackground?: boolean
  }) {

  const MyIcon = () => {
    return (
      <View style={[styles.container, removeBackground && styles.removeBackground]}>
        <IconSymbol weight={weight} color={color || Theme.colors.primary} name={name} size={size} />
      </View>
    );
  };


  if (href) {
    return (
      <Link push href={href}>
        <MyIcon />
      </Link>
    );
  } else return (
    <Pressable onPress={onPress}>
      <MyIcon />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    color: Theme.colors.primary,
    borderRadius: Theme.radius.full,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    backgroundColor: Theme.colors.iconBackground,
  },
  removeBackground: {
    backgroundColor: 'transparent',
    padding: 0,
  },
});