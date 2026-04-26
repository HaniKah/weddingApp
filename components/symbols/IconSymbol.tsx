// Fallback for using MaterialIcons on Android and web.

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {SymbolViewProps, SymbolWeight} from 'expo-symbols';
import {ComponentProps} from 'react';
import {OpaqueColorValue, type StyleProp, type TextStyle} from 'react-native';

type IconMapping = Record<SymbolViewProps['name'], ComponentProps<typeof MaterialIcons>['name']>;
export type IconSymbolName = keyof typeof MAPPING;

/**
 * Add your SF Symbols to Material Icons mappings here.
 * - see Material Icons in the [Icons Directory](https://icons.expo.fyi).
 * - see SF Symbols in the [SF Symbols](https://developer.apple.com/sf-symbols/) app.
 */
const MAPPING = {
    'house': 'home',
    'person.3.fill': 'groups',
    'heart.text.clipboard.fill': 'description',
    'gearshape.fill': 'settings',
    'checklist': 'checklist',
    'chart.line.uptrend.xyaxis': "trending-up",
    'square.and.pencil': 'edit',
    'horn.blast': 'campaign',
    'person': 'person',
    'plus': "add",
    "eye": "preview",
    "square.and.arrow.down": "download",
    "square.and.arrow.up": "publish",
    "trash": "delete-outline",
    "checkmark.circle.fill": "check-circle",
    "location": "location-on",
    "chevron.right": "chevron-right",
    "mappin.and.ellipse": "location-city",
    "magnifyingglass": "search",
    "checkmark": "check",
} as IconMapping;

/**
 * An icon component that uses native SF Symbols on iOS, and Material Icons on Android and web.
 * This ensures a consistent look across platforms, and optimal resource usage.
 * Icon `name`s are based on SF Symbols and require manual mapping to Material Icons.
 */
export function IconSymbol({
                               name,
                               size = 24,
                               color,
                               style,
                           }: {
    name: IconSymbolName;
    size?: number;
    color: string | OpaqueColorValue;
    style?: StyleProp<TextStyle>;
    weight?: SymbolWeight;
}) {
    return <MaterialIcons color={color} size={size} name={MAPPING[name]} style={style}/>;
}
