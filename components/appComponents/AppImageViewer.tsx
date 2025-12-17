import {Dimensions, Image, Modal, Pressable, StyleSheet, View} from "react-native";
import {useEffect, useState} from "react";
import {IconSymbol} from "@/components/symbols/IconSymbol";
import {SafeAreaView} from "react-native-safe-area-context";

export interface ImageView {
    uri: string
}

export default function AppImageViewer({isVisible, onClose, images, activeIndex}: {
    isVisible: boolean,
    onClose: () => void,
    images: ImageView[],
    activeIndex: number

}) {
    const screenWidth = Dimensions.get('window').width;
    const [height, setHeight] = useState(0);

    useEffect(() => {
        if (!images[activeIndex]) return
        Image.getSize(images[activeIndex]?.uri, (width, height) => {
            const ratio = height / width;
            setHeight(screenWidth * ratio);
        });
    }, [images[activeIndex]?.uri]);
    return (
        <>
            <Modal allowSwipeDismissal={true}
                   visible={isVisible}
                   onRequestClose={onClose}
                   animationType="slide">
                <SafeAreaView style={styles.safeArea}>
                    <View style={styles.container}>
                        <View style={styles.header}>
                            <Pressable onPress={onClose} style={styles.pressable}>
                                <IconSymbol color="white" size={25} name="xmark"/>
                            </Pressable>
                        </View>
                        <View style={styles.imageContainer}>
                            <Image resizeMode="contain" style={[styles.image, {height,}]}
                                   source={{uri: images[activeIndex]?.uri}}/>
                        </View>
                    </View>
                </SafeAreaView>
            </Modal>
        </>
    )
}
const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "black"
    },
    container: {
        backgroundColor: "black",
        flex: 1,
    },
    imageContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
    },
    image: {
        width: "100%",
    },
    header: {
        display: "flex",
        flexDirection: "row-reverse",
    },
    pressable: {
        marginRight: 25,
    }

})