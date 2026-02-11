import {Dimensions, Modal, Pressable, StyleSheet, View} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {IconSymbol} from "@/components/symbols/IconSymbol";
import {PhotosDto} from "@/types/open-api";
import ImageViewer from "react-native-image-zoom-viewer";

export default function AppImageViewer({isVisible, onClose, images, activeIndex}: {
    isVisible: boolean,
    onClose: () => void,
    images: PhotosDto[],
    activeIndex: number

}) {
    const {width} = Dimensions.get('window')
    const insets = useSafeAreaInsets();

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

    const ViewableImages = images.map((i) => {
        return {
            url: i.uri,
            width: width,
            height: width * i.ratio
        }
    })
    return (
        <>
            <Modal
                allowSwipeDismissal={true}
                visible={isVisible}
                onRequestClose={onClose}
                animationType="none">
                <View style={{paddingTop: insets.top, paddingBottom: insets.bottom, flex: 1, backgroundColor: "black"}}>
                    <ImageViewer
                        pageAnimateTime={200}
                        renderHeader={ImageHeader}
                        onSwipeDown={() => onClose()}
                        index={activeIndex} enableSwipeDown={true}
                        imageUrls={ViewableImages}>

                    </ImageViewer>
                </View>

            </Modal>
        </>
    )
}
const styles = StyleSheet.create({

    headerContainer: {
        display: "flex",
        flexDirection: "row-reverse",
        paddingTop: 20,
        paddingHorizontal: 20,
    }


})