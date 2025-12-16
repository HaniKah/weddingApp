import {Dimensions, Modal, StyleSheet, TouchableOpacity, View} from "react-native";
import Animated, {useAnimatedStyle, useSharedValue, withSpring} from 'react-native-reanimated';
import {Theme} from "@/styles/Theme";
import {Gesture, GestureDetector} from "react-native-gesture-handler";
import {useEffect} from "react";


export default function AppBottomSheet({isVisible, setIsVisible, children}: {
    isVisible: boolean,
    setIsVisible: (value: boolean) => void
    children: React.ReactNode
}) {
    const height = Dimensions.get('window').height;
    const HALF_SCREEN = height * 0.5;
    const FULL_SCREEN = height * 0.1;
    const offset = useSharedValue(0);
    const start = useSharedValue(0);
    const shouldClose = useSharedValue(false);
    // console.log("height", height)
    // console.log("halfScreen", HALF_SCREEN)
    // console.log("fullScreen", FULL_SCREEN)
    // console.log("start", start.value)


    // const flingUp = Gesture.Fling()
    //     .direction(Directions.UP)
    //     .onStart((e) => {
    //         offset.value = withSpring(FULL_SCREEN);
    //     })
    // const flingDown = Gesture.Fling()
    //     .direction(Directions.DOWN)
    //     .onStart((e) => {
    //         if (offset.value !== HALF_SCREEN) {
    //             offset.value = withSpring(HALF_SCREEN);
    //         }
    //     })

    const PanVertical = Gesture.Pan()
        .onStart((event) => {
            start.value = offset.value
            // console.log("start", event.translationY)
        }).onUpdate(({translationY, velocityY}) => {
            offset.value = start.value + translationY


        }).onEnd(({translationY, velocityY}) => {
            if (translationY < -100 || velocityY < 1000) {
                offset.value = withSpring(FULL_SCREEN)
            } else if (translationY > 100 || velocityY > 1000) {
                offset.value = withSpring(HALF_SCREEN)
            } else {
                offset.value = withSpring(HALF_SCREEN)
            }
        })


    // useAnimatedReaction(
    //     () => shouldClose.value,
    //     (close) => {
    //         if (close) {
    //             setIsVisible(false); // ✅ safe: now running on JS thread
    //             shouldClose.value = false; // reset
    //         }
    //     }
    // );

    useEffect(() => {
        if (!isVisible) {
            offset.value = withSpring(height);
        } else {
            offset.value = withSpring(HALF_SCREEN);
            // console.log("offset", offset.value)
        }
    }, [isVisible]);


    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{translateY: offset.value}],
    }));

    return (
        <>
            <Modal transparent visible={isVisible}>
                {isVisible && <TouchableOpacity onPress={() => setIsVisible(false)} style={styles.background}/>}
                <Animated.View style={[styles.container, animatedStyle]}>

                    <GestureDetector gesture={PanVertical}>
                        <View style={styles.handlerContainer}>
                            {/*<IconButton size={Theme.sizes.md} name="xmark" onPress={() => setIsVisible(false)}/>*/}
                            <View style={styles.handler}/>
                            {/*<View style={{width: 30}}></View>*/}
                        </View>
                    </GestureDetector>

                    <View style={styles.content}>
                        {children}
                    </View>

                </Animated.View>
            </Modal>

        </>

    )
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        width: "100%",
        height: "100%",
        backgroundColor: Theme.colors.white,
        borderTopEndRadius: 25,
        borderTopStartRadius: 25,
        zIndex: 100,

    },
    handlerContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 15,
        paddingBottom: 10

    },
    handler: {
        height: 5,
        width: 50,
        backgroundColor: Theme.colors.gray.S300,
        borderRadius: Theme.radius.full,
        margin: "auto",

    },
    content: {},
    background: {
        zIndex: 99,
        height: "100%",
        width: "100%",
        position: "absolute",
        backgroundColor: "rgba(0,0,0,0.5)",
    }
})