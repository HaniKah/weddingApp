import {Dimensions, FlatList, Modal, Pressable, StyleSheet, View} from "react-native";
import {useRef} from "react";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {IconSymbol} from "@/components/symbols/IconSymbol";
import ImageItem from "@/components/items/ImageItem";
import {PhotosDto} from "@/types/open-api";


export default function AppImageViewer({isVisible, onClose, images, activeIndex}: {
    isVisible: boolean,
    onClose: () => void,
    images: PhotosDto[],
    activeIndex: number

}) {
    const {width, height} = Dimensions.get('window')
    // const [imageView, setImageView] = useState<ImageItemType[]>([]);
    const insets = useSafeAreaInsets();
    const flatListRef = useRef<FlatList>(null);

    //
    // useEffect(() => {
    //     if (!images.length) return;
    //
    //     Promise.all(
    //         images.map(
    //             uri =>
    //                 new Promise<ImageItemType>((resolve) => {
    //                     Image.getSize(uri, (width, height) => {
    //                         resolve({uri, ratio: height / width});
    //                     });
    //                 })
    //         )
    //     ).then(list => {
    //         setImageView(list);
    //     });
    //
    //     flatListRef.current?.scrollToIndex({index: activeIndex, animated: false});
    // }, [images]);


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
                    <ImageHeader/>

                    <View style={styles.container}>
                        <View style={styles.listContainer}>
                            <FlatList

                                pagingEnabled
                                snapToInterval={width}
                                snapToAlignment="start"
                                decelerationRate="fast"
                                getItemLayout={(data, index) => ({
                                    length: width,
                                    offset: width * index,
                                    index
                                })}
                                ref={flatListRef}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={styles.flatlistContainer}
                                renderItem={({item}) => <ImageItem image={item}/>}
                                data={images}

                            />
                        </View>
                    </View>
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
    },

})