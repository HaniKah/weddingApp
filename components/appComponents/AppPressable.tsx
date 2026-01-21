import {Pressable, PressableStateCallbackType} from "react-native";
import {PressableProps} from "react-native/Libraries/Components/Pressable/Pressable";
import Animated, {useAnimatedStyle, useSharedValue, withSpring} from "react-native-reanimated";
import type * as React from "react";
import {forwardRef} from "react";

// export default function AppPressable(props: PressableProps & React.RefAttributes<View>) {
//
//
//     const scale = useSharedValue(1)
//     const scaleAnimated = useAnimatedStyle(() => ({
//         transform: [{scale: scale.value}]
//     }))
//
//
//     return (
//         <Pressable {...props}
//                    onPressIn={() => scale.value = withSpring(0.95)}
//                    onPressOut={() => scale.value = withSpring(1)}>
//             {(state: PressableStateCallbackType) => (
//                 <Animated.View style={scaleAnimated}>
//                     {typeof props.children === "function" ? props.children(state) : props.children}
//                 </Animated.View>
//             )}
//         </Pressable>
//     )
// }

const AppPressable = forwardRef<any, PressableProps>((props, ref) => {
    const {children, onPressIn, onPressOut, ...rest} = props;

    const scale = useSharedValue(1);
    const opacity = useSharedValue(1);
    const scaleAnimated = useAnimatedStyle(() => ({
        transform: [{scale: scale.value}],
        opacity: opacity.value
    }));

    return (
        <Pressable
            ref={ref}
            {...rest}
            onPressIn={(e) => {
                scale.value = withSpring(0.95);
                opacity.value = withSpring(0.6);
                onPressIn?.(e); // this is just if we add onPressIn prop to AppPressable
            }}
            onPressOut={(e) => {
                scale.value = withSpring(1);
                opacity.value = withSpring(1);
                onPressOut?.(e);
            }}
        >
            {(state: PressableStateCallbackType) => (
                <Animated.View style={scaleAnimated}>
                    {typeof children === "function" ? children(state) : children}
                </Animated.View>
            )}
        </Pressable>
    );
});
AppPressable.displayName = "AppPressable";

export default AppPressable;