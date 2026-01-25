import Animated, {useAnimatedStyle, useDerivedValue, useSharedValue, withSpring} from "react-native-reanimated";
import {Dimensions, StyleSheet, View} from "react-native";
import {Gesture, GestureDetector} from "react-native-gesture-handler";
import {PhotosDto} from "@/types/open-api";

// export interface ImageItemType {
//     uri: string,
//     ratio: number
// }


export default function ImageItem({image}: { image: PhotosDto }) {

    const {width, height} = Dimensions.get("window");

    const DEFAULT_ZOOM = 1
    const DOUBLE_TAP_ZOOM = 2
    const DEFAULT_POSITION = {x: 0, y: 0}
    const offset = useSharedValue(DEFAULT_POSITION);
    const start = useSharedValue(DEFAULT_POSITION);
    const scale = useSharedValue(DEFAULT_ZOOM);
    const savedScale = useSharedValue(DEFAULT_ZOOM);
    const scaledWidth = useSharedValue(width);


    const edges = useDerivedValue(() => {
        const scaledWidth = width * scale.value;
        const scaledHeight = height * scale.value;

        const left = width / 2 - scaledWidth / 2 + offset.value.x;
        const right = width / 2 + scaledWidth / 2 + offset.value.x;
        const top = height / 2 - scaledHeight / 2 + offset.value.y;
        const bottom = height / 2 + scaledHeight / 2 + offset.value.y;
        return {left, right, top, bottom};
    });


    const doubleTapGesture = Gesture.Tap()
        .numberOfTaps(2)
        .onStart(() => {
            if (scale.value === DEFAULT_ZOOM) {
                scale.value = withSpring(DOUBLE_TAP_ZOOM)
            } else {
                scale.value = withSpring(DEFAULT_ZOOM)
                offset.value = withSpring(DEFAULT_POSITION);
                start.value = withSpring(DEFAULT_POSITION);
            }
        })

    const panGesture = Gesture.Pan()
        .enabled(false)
        .minPointers(1)
        .averageTouches(true)
        .onUpdate((e) => {
            offset.value = {
                x: e.translationX + start.value.x,
                y: e.translationY + start.value.y,
            };
        })

        .onEnd(() => {
            offset.value = DEFAULT_POSITION
        })


    const pinchGesture = Gesture.Pinch()
        .onUpdate((event) => {
            scale.value = savedScale.value * event.scale;
            scaledWidth.value = scale.value * width
        })
        .onEnd(() => {
            savedScale.value = scale.value;
        });


    const composed = Gesture.Race(
        doubleTapGesture,
        Gesture.Simultaneous(panGesture, pinchGesture)
    );

    const animatedStyles = useAnimatedStyle(() => {
        return {
            width: width,
            height: width * image.ratio,

            transform: [
                {translateX: offset.value.x},
                {translateY: offset.value.y},
                {scale: scale.value},
            ],
        };
    });


    return (
        <>
            <GestureDetector gesture={composed}>
                <View style={[styles.imageContainer, {height, width}]}>
                    <Animated.Image
                        source={{uri: image.uri}} style={animatedStyles}/>
                </View>

            </GestureDetector>
        </>
    );
}
const styles = StyleSheet.create({
    imageContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
    }
})