import React, {useCallback, useState} from 'react';
import {
    LayoutAnimation,
    Platform,
    Pressable,
    type StyleProp,
    StyleSheet,
    UIManager,
    View,
    type ViewStyle,
} from 'react-native';
import Animated, {interpolate, useAnimatedStyle, useSharedValue, withTiming,} from 'react-native-reanimated';

// Enable LayoutAnimation on Android
if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

// ─── Types ────────────────────────────────────────────────────────────────────

export interface CollapsibleProps {
    /** The trigger element — anything renderable */
    header: React.ReactNode;
    /** Content revealed when expanded */
    children: React.ReactNode;
    /** Whether the section starts open */
    defaultExpanded?: boolean;
    /** Control expanded state from outside */
    expanded?: boolean;
    /** Called when the user toggles the section */
    onToggle?: (expanded: boolean) => void;
    /** Hide the built-in chevron (e.g. if you render your own in `header`) */
    hideChevron?: boolean;
    /** Duration of the expand/collapse animation in ms */
    animationDuration?: number;
    /** Style applied to the outer container */
    containerStyle?: StyleProp<ViewStyle>;
    /** Style applied to the header row */
    headerStyle?: StyleProp<ViewStyle>;
    /** Style applied to the collapsible content wrapper */
    contentStyle?: StyleProp<ViewStyle>;
    /** Accessibility label for the toggle button */
    accessibilityLabel?: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function AppCollapsible({
                                   header,
                                   children,
                                   defaultExpanded = false,
                                   expanded: controlledExpanded,
                                   onToggle,
                                   hideChevron = false,
                                   animationDuration = 350,
                                   containerStyle,
                                   headerStyle,
                                   contentStyle,
                                   accessibilityLabel,
                               }: CollapsibleProps) {
    // Support both controlled and uncontrolled usage
    const isControlled = controlledExpanded !== undefined;
    const [internalExpanded, setInternalExpanded] = useState(defaultExpanded);
    const isExpanded = isControlled ? controlledExpanded : internalExpanded;

    // Animated chevron rotation
    const rotation = useSharedValue(isExpanded ? 1 : 0);

    const chevronStyle = useAnimatedStyle(() => ({
        transform: [
            {
                rotate: `${interpolate(rotation.value, [0, 1], [0, 180])}deg`,
            },
        ],
    }));

    const handleToggle = useCallback(() => {
        const next = !isExpanded;

        rotation.value = withTiming(next ? 1 : 0, {duration: animationDuration});

        LayoutAnimation.configureNext({
            duration: animationDuration,
            update: {type: 'easeInEaseOut', duration: animationDuration},
            create: {type: 'easeInEaseOut', property: 'opacity', duration: animationDuration},
            delete: {type: 'easeInEaseOut', property: 'opacity', duration: animationDuration},
        });

        if (!isControlled) {
            setInternalExpanded(next);
        }

        onToggle?.(next);
    }, [isExpanded, isControlled, onToggle, rotation, animationDuration]);

    return (
        <View style={[styles.container, containerStyle]}>
            {/* ── Header ── */}
            <Pressable
                onPress={handleToggle}
                style={({pressed}) => [
                    styles.header,
                    headerStyle,
                    pressed && styles.headerPressed,
                ]}
                accessibilityRole="button"
                accessibilityState={{expanded: isExpanded}}
                accessibilityLabel={accessibilityLabel}
            >
                <View style={styles.headerContent}>{header}</View>

                {!hideChevron && (
                    <Animated.View style={[styles.chevron, chevronStyle]}>
                        <ChevronIcon/>
                    </Animated.View>
                )}
            </Pressable>

            {/* ── Collapsible body ── */}
            {isExpanded && (
                <Animated.View
                    style={[styles.content, contentStyle]}>{children}</Animated.View>
            )}
        </View>
    );
}

// ─── Chevron SVG (no external dep) ───────────────────────────────────────────

function ChevronIcon() {
    // Using a simple Unicode chevron rendered via Text so there are zero deps.
    // Swap this out for your icon library (e.g. Ionicons, Feather, etc.) if preferred.
    return (
        <Animated.Text style={styles.chevronText} allowFontScaling={false}>
            ›
        </Animated.Text>
    );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 14,
        paddingHorizontal: 16,
    },
    headerPressed: {
        opacity: 0.6,
    },
    headerContent: {
        flex: 1,
    },
    chevron: {
        marginLeft: 8,
    },
    chevronText: {
        fontSize: 20,
        lineHeight: 22,
        // Rotate 90° so › points downward by default
        transform: [{rotate: '90deg'}],
        color: '#888',
    },
    content: {
        paddingHorizontal: 16,
        paddingBottom: 14,
    },
});
