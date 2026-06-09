import {useApi} from "@/utils/api";
import {PhotosDto, PhotoSize} from "@/types/open-api";
import {useEffect, useState} from "react";
import {Dimensions, FlatList, Pressable} from "react-native";
import {Image} from "expo-image";
import AppImageViewer from "@/components/appComponents/AppImageViewer";


export default function Gallery({placeId}: { placeId: number }) {
    const API = useApi().api
    const [images, setImages] = useState<PhotosDto[]>([])
    const [selectedImage, setSelectedImage] = useState<number>()
    const GAP = 5;
    const IMAGE_WIDTH = (Dimensions.get("window").width - (GAP * 4)) / 3;

    useEffect(() => {
        const getPhotos = async () => {
            try {
                const res = await API.photosControllerGetAllPhotos(placeId, PhotoSize.Thumbnail)
                setImages(res.data.result)
            } catch (err) {
                console.error(err)
            }
        }
        getPhotos()
    }, [placeId]);

    // function viewImage(imageId: number) {
    //     // setImageView(true)
    //     setSelectedImage(imageId)
    // }

    function ImageThumbnail({item}: { item: PhotosDto }) {
        return (
            <>
                <Pressable onPress={() => setSelectedImage(item.id)}>
                    <Image style={{height: IMAGE_WIDTH, width: IMAGE_WIDTH}}
                           source={{uri: item.uri}}
                           transition={200}
                           placeholder={item.blurhash}
                           cachePolicy="disk"
                           contentFit="cover"/>
                </Pressable>
            </>
        )
    }

    // const imageIds = useMemo(() => images.map(image => image.id), [images]);
    return (
        <>
            <FlatList numColumns={3}
                      data={images}
                      keyExtractor={(item, index) => index.toString()}
                      contentContainerStyle={{padding: GAP, gap: GAP}}
                      columnWrapperStyle={{gap: GAP}}
                      getItemLayout={(data, index) => (
                          {length: IMAGE_WIDTH + GAP, offset: (IMAGE_WIDTH + GAP) * index, index}
                      )}
                      renderItem={({item, index}) => (<ImageThumbnail item={item}/>)}/>

            <AppImageViewer visible={!!selectedImage} activeImageId={selectedImage} setActiveImageId={setSelectedImage}
                            placeId={placeId}/>

        </>
    )
}