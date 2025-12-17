import {Dimensions, FlatList, Image, Modal, Pressable, StyleSheet, View} from "react-native";
import {useEffect, useRef, useState} from "react";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {IconSymbol} from "@/components/symbols/IconSymbol";

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
    // const [height, setHeight] = useState(0);
    const [imageView, setImageView] = useState<ImageView[]>([]);
    const insets = useSafeAreaInsets();
    const flatListRef = useRef<FlatList>(null);

    //
    // useEffect(() => {
    //     if (images.length === 0) return
    //     let list: ImageView[] = []
    //     images.forEach((uri) => {
    //         Image.getSize(uri, (width, height) => {
    //             list.push({uri, ratio: height / width})
    //         })
    //     })
    //     setImageView(list)
    // }, [images]);

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
        return (
            <>
                <Image source={{uri: image.uri}} style={{width: screenWidth, height: screenWidth * image.ratio}}/>
            </>
        )
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