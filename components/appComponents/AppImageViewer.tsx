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
    // const [imageView, setImageView] = useState<ImageItemType[]>([]);
    const insets = useSafeAreaInsets();
    // const flatListRef = useRef<FlatList>(null);
    // const [scrollEnabled, setScrollEnabled] = useState<boolean>(true);

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


    // useEffect(() => {
    //     flatListRef.current?.scrollToIndex({index: activeIndex, animated: true});
    // }, [activeIndex]);

    // function scrollNext() {
    //     // flatListRef.current?.scrollToIndex({index: activeIndex + 1, animated: true});
    //     console.log("nothing")
    //
    // }

    // const scrollEnabledUI = useSharedValue(true)

    const correctImages = images.map((i) => {
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
                    {/*<ImageHeader/>*/}

                    {/*<View style={styles.container}>*/}
                    {/*<View style={styles.listContainer}>*/}
                    {/*            <FlatList*/}
                    {/*                initialScrollIndex={activeIndex}*/}
                    {/*                pagingEnabled*/}
                    {/*                snapToInterval={width}*/}
                    {/*                snapToAlignment="start"*/}
                    {/*                decelerationRate="fast"*/}
                    {/*                scrollEventThrottle={16}*/}
                    {/*                getItemLayout={(data, index) => ({*/}
                    {/*                    length: width,*/}
                    {/*                    offset: width * index,*/}
                    {/*                    index*/}
                    {/*                })}*/}
                    {/*                ref={flatListRef}*/}
                    {/*                horizontal*/}
                    {/*                showsHorizontalScrollIndicator={false}*/}
                    {/*                contentContainerStyle={styles.flatlistContainer}*/}
                    {/*                renderItem={({item}) => <ImageItem*/}
                    {/*                    image={item}/>*/}
                    {/*                }*/}
                    {/*                data={images}*/}

                    {/*            />*/}
                    {/*</View>*/}
                    {/*</View>*/}
                    <ImageViewer
                        renderHeader={ImageHeader}
                        onSwipeDown={() => onClose()}
                        index={activeIndex} enableSwipeDown={true}
                        imageUrls={correctImages}>

                    </ImageViewer>
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
        // backgroundColor: "blue"
    },

})