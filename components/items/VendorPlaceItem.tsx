import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {PlaceStatus, VendorPlaceDto} from '@/types/open-api';
import {Theme} from '@/styles/Theme';
import AppButton from '@/components/appComponents/AppButton';
import {Dispatch, SetStateAction, useState} from "react";
import {useApi} from "@/utils/api";

type VendorPlaceItemProps = {
    data: VendorPlaceDto;
    setTrigger: Dispatch<SetStateAction<boolean>>;
    openBottomSheet: (placeId: number) => void;
}

export default function VendorPlaceItem({data, setTrigger, openBottomSheet}: VendorPlaceItemProps) {
    const API = useApi()
    const [isLoading, setIsLoading] = useState(true);

    const publish = async (placeId: number, placeStatus: PlaceStatus) => {
        try {
            setIsLoading(true)
            await API.placesControllerToggleStatus({placeId: placeId, status: placeStatus})
        } catch (err) {

        } finally {
            setIsLoading(false)
            setTrigger((prev: boolean) => !prev)
        }
    }
    return (
        <>
            <Pressable onPress={() => openBottomSheet(data.id)}>
                <View style={styles.container}>
                    <View style={styles.imageContainer}>
                        <Image style={styles.image} source={{uri: data.thumbnail}}/>
                    </View>
                    <View style={styles.infoContainer}>
                        <Text style={styles.placeName}>{data.name}</Text>
                        <Text>{data.streetName}</Text>
                        <View style={styles.priceContainer}>
                            {data.prices.priceRange.min === data.prices.priceRange.max ?
                                <Text>{data.prices?.priceRange?.min}</Text> :
                                <Text>{data.prices?.priceRange?.min} - {data.prices?.priceRange?.max}
                                </Text>
                            }
                            <Text style={styles.currency}>  {data.prices.currency}</Text>
                        </View>

                    </View>
                    <View>
                        {
                            data.status === PlaceStatus.Unpublished &&
                            <AppButton buttonSize="SM" onPress={() => publish(data.id, PlaceStatus.Published)}
                                       confirmative>
                                Publish
                            </AppButton>
                        }
                        {
                            data.status === PlaceStatus.Published &&
                            <AppButton buttonSize="SM" onPress={() => publish(data.id, PlaceStatus.Unpublished)}
                                       destructive>
                                Unpublish
                            </AppButton>
                        }
                        {
                            data.status === PlaceStatus.Incomplete &&
                            <AppButton buttonSize="SM" confirmative>
                                complete
                            </AppButton>
                        }

                    </View>
                </View>
            </Pressable>
        </>
    );
}
const styles = StyleSheet.create({
    publishBtn: {},
    publishText: {},

    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 10,
        borderRadius: Theme.radius.md,
        backgroundColor: Theme.colors.white,
        overflow: 'hidden',
        padding: 10,

    },
    imageContainer: {
        height: 75,
        width: 75,
    },
    image: {
        borderRadius: Theme.radius.xs,
        backgroundSize: 'cover',
        height: '100%',
    },
    infoContainer: {
        flex: 1,
    },
    placeName: {
        fontWeight: 'bold',
        fontSize: Theme.sizes.md
    },
    currency: {
        color: Theme.colors.gray.S500,

    },
    priceContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    }
});