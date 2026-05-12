import {useApi} from "@/utils/api";
import {PhotosDto} from "@/types/open-api";
import {useEffect, useState} from "react";
import {Dimensions, FlatList, Pressable} from "react-native";
import {Image} from "expo-image";
import AppImageViewer from "@/components/appComponents/AppImageViewer";


export default function Gallery({placeId}: { placeId: number }) {
    const API = useApi().api
    const [images, setImages] = useState<PhotosDto[]>([])
    const [selectedImage, setSelectedImage] = useState<number>()
    const [imageView, setImageView] = useState(false)
    const IMAGE_WIDTH = Dimensions.get("window").width / 3;

    useEffect(() => {
        const getPhotos = async () => {
            try {
                const res = await API.photosControllerGetPhotos(placeId)
                setImages(res.data.result)
            } catch (err) {
                console.error(err)
            }
        }
        getPhotos()
    }, [placeId]);

    function viewImage(index: number) {
        setImageView(true)
        setSelectedImage(index)
    }

    function ImageThumbnail({item}: { item: PhotosDto }) {
        return (
            <>

                <Pressable onPress={() => viewImage(item.id)}>
                    <Image style={{height: IMAGE_WIDTH, width: IMAGE_WIDTH}} source={{uri: item.uri}} transition={200}
                           placeholder={item.blurhash}
                           cachePolicy="disk"
                           contentFit="cover"/>
                </Pressable>
            </>
        )
    }


    return (
        <>
            <FlatList numColumns={3}
                      data={images}
                      keyExtractor={(item, index) => index.toString()}
                      getItemLayout={(data, index) => (
                          {length: IMAGE_WIDTH, offset: IMAGE_WIDTH * index, index}
                      )}
                      renderItem={({item, index}) => (<ImageThumbnail item={item}/>)}/>

            {selectedImage &&
                <AppImageViewer activeId={selectedImage}
                                ids={images.map(id => id.id)}
                                isVisible={imageView}
                                onClose={() => setImageView(false)}/>
            }

        </>
    )
}