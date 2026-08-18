import {Pressable, StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {IconSymbol} from '@/components/symbols/IconSymbol';
import {SFSymbols6_0} from 'sf-symbols-typescript';
import {Theme} from '@/styles/Theme';
import {SymbolWeight} from 'expo-symbols';
import {Href, Link} from 'expo-router';
import Animated, {useAnimatedStyle, useSharedValue, withSpring} from "react-native-reanimated";

export function IconButton(
    {
        name,
        color = Theme.colors.primary,
        weight = 'bold',
        size = Theme.sizes.lg,
        onPress,
        href,
        removeBackground = false,
        extraStylesBtn,
        testID

    }: {
        name: SFSymbols6_0,
        color?: string,
        weight?: SymbolWeight
        size?: number
        onPress?: () => void,
        href?: Href
        removeBackground?: boolean
        extraStylesBtn?: StyleProp<ViewStyle>
        testID?: string

    }) {

    const content = (
        <View style={[styles.container, removeBackground && styles.removeBackground, extraStylesBtn]}>
            <IconSymbol weight={weight} color={color || Theme.colors.primary} name={name} size={size}/>
        </View>
    );

    const scale = useSharedValue(1);
    const scaleAnimated = useAnimatedStyle(() => ({
        transform: [{scale: scale.value}],
    }));


    if (href) {
        return (
            <Link testID={testID} push href={href}>
                {content}
            </Link>
        );
    } else return (
        <Pressable hitSlop={removeBackground ? 14 : 4}
                   onPressIn={(e) => {
            scale.value = withSpring(0.90);
        }}
                   onPressOut={(e) => {
                       scale.value = withSpring(1);
                   }} testID={testID} onPress={onPress}>
            <Animated.View style={scaleAnimated}>
                {content}
            </Animated.View>
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