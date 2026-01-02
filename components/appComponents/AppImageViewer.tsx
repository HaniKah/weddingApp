import {Dimensions, FlatList, Image, Modal, Pressable, StyleSheet, View} from "react-native";
import {useEffect, useRef, useState} from "react";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {IconSymbol} from "@/components/symbols/IconSymbol";
import {Gesture, GestureDetector} from "react-native-gesture-handler";
import Animated, {useAnimatedStyle, useSharedValue, withSpring} from "react-native-reanimated";

export interface ImageView {
    uri: string,
    ratio: number
}

export default function AppImageViewer({isVisible, onClose, images, activeIndex}: {
    isVisible: boolean,
    onClose: () => void,
    images: string[],
    activeIndex: number

}) {
    const screenWidth = Dimensions.get('window').width;
    const [imageView, setImageView] = useState<ImageView[]>([]);
    const insets = useSafeAreaInsets();
    const flatListRef = useRef<FlatList>(null);


    useEffect(() => {
        if (!images.length) return;

        Promise.all(
            images.map(
                uri =>
                    new Promise<ImageView>((resolve) => {
                        Image.getSize(uri, (width, height) => {
                            resolve({uri, ratio: height / width});
                        });
                    })
            )
        ).then(list => {
            setImageView(list);
        });

        flatListRef.current?.scrollToIndex({index: activeIndex, animated: false});
    }, [images]);


    function ImageItem({image}: { image: ImageView }) {

        const DEFAULT_ZOOM = 1
        const DOUBLE_TAP_ZOOM = 2
        const DEFAULT_POSITION = {x: 0, y: 0}
        const offset = useSharedValue(DEFAULT_POSITION);
        const start = useSharedValue(DEFAULT_POSITION);
        const scale = useSharedValue(DEFAULT_ZOOM);
        const savedScale = useSharedValue(DEFAULT_ZOOM);

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


        const dragGesture = Gesture.Pan()
            .minPointers(2)
            .averageTouches(true)

            .onUpdate((e) => {
                offset.value = {
                    x: e.translationX + start.value.x,
                    y: e.translationY + start.value.y,
                };
            })
            .onEnd(() => {
                if (scale.value === DEFAULT_ZOOM) {
                    offset.value = withSpring(DEFAULT_POSITION);
                    start.value = withSpring(DEFAULT_POSITION);
                } else {

                    start.value = {
                        x: offset.value.x,
                        y: offset.value.y,
                    };


                }


            });

        const pinchGesture = Gesture.Pinch()
            .onUpdate((event) => {
                scale.value = savedScale.value * event.scale;
            })
            .onEnd(() => {
                savedScale.value = scale.value;
            });


        const composed = Gesture.Race(
            doubleTapGesture,
            Gesture.Simultaneous(dragGesture, pinchGesture)
        );

        const animatedStyles = useAnimatedStyle(() => {
            return {
                width: screenWidth,
                height: screenWidth * image.ratio,

                transform: [
                    {translateX: offset.value.x},
                    {translateY: offset.value.y},
                    {scale: scale.value},
                ],
            };
        });


        return (
            <GestureDetector gesture={composed}>
                <Animated.View>
                    <Animated.Image source={{uri: image.uri}} style={animatedStyles}/>
                </Animated.View>
            </GestureDetector>
        );
    }

    function ImageHeader() {
        return (
            <>
                <View style={styles.headerContainer}>
                    <Pressable onPress={onClose}>
                        <IconSymbol color="white" size={25} name="xmark"/>
                    </Pressable>
                </View>
            </>
        )
    }


    return (
        <>
            <Modal
                allowSwipeDismissal={true}
                visible={isVisible}
                onRequestClose={onClose}
                animationType="none">
                <View style={{paddingTop: insets.top, paddingBottom: insets.bottom, flex: 1, backgroundColor: "black"}}>
                    {/*<SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>*/}
                    <ImageHeader/>
                    <View style={styles.container}>
                        <View style={styles.listContainer}>
                            <FlatList
                                pagingEnabled
                                snapToInterval={screenWidth}
                                snapToAlignment="start"
                                decelerationRate="fast"
                                getItemLayout={(data, index) => ({
                                    length: screenWidth,
                                    offset: screenWidth * index,
                                    index
                                })}
                                ref={flatListRef}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={styles.flatlistContainer}
                                renderItem={({item}) => <ImageItem image={item}/>}
                                data={imageView}

                            />
                        </View>
                    </View>
                    {/*</SafeAreaView>*/}
                </View>
            </Modal>
        </>
    )
}
const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "black",
    },
    container: {
        backgroundColor: "black",
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    headerContainer: {
        display: "flex",
        flexDirection: "row-reverse",
        paddingTop: 20,
        paddingHorizontal: 20,
    },
    listContainer: {
        height: "100%"
    },
    flatlistContainer: {
        display: "flex",
        alignItems: "center",
    }
})