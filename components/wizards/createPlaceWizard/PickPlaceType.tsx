import {FlatList, Pressable, StyleSheet, Text, View} from "react-native";
import {CreatePlaceSteps, VendorPlaceDetailsDto, WeddingSteps} from "@/types/open-api";
import {Theme} from "@/styles/Theme";
import AppButton from "@/components/appComponents/AppButton";
import IconStep from "@/components/symbols/IconStep";
import {useColors} from "@/utils/colors";
import {useEffect, useState} from "react";
import {useApi} from "@/utils/api";


export default function PickPlaceType({data, setData, onNext, placeId}: {
    data: VendorPlaceDetailsDto | undefined
    setData: (data: VendorPlaceDetailsDto | undefined) => void
    onNext: () => void
    placeId: number | undefined
}) {
    const placeTypeList: WeddingSteps[] = Object.values(WeddingSteps)
    const getColorByStep = useColors()
    const [selectedType, setSelectedType] = useState<WeddingSteps | undefined>(data?.step)
    const API = useApi()

    const PickPlaceItem = ({step}: { step: WeddingSteps }) => {
        return (
            <Pressable onPress={() => setSelectedType(step)}
                       style={[styles.placeItem, selectedType === step && styles.selected]}>
                <IconStep step={step} width={50} height={50} fill={getColorByStep(step)}/>
                <Text style={styles.placeText}>{step}</Text>
            </Pressable>
        )
    }

    useEffect(() => {
        setSelectedType(data?.step)
    }, [data]);


    const updateOrCreatePlace = async () => {
        if (!selectedType) return
        try {
            if (placeId) {
                const res = await API.placesControllerUpdatePlace({
                    id: placeId,
                    createStep: CreatePlaceSteps.PickPlaceType,
                    type: selectedType
                })
                setData(res.data)
            } else {
                const res = await API.placesControllerCreatePlace({step: selectedType})
                setData(res.data)
            }
        } catch (err) {
            console.error(err)
        }
    }

    const preNext = async () => {
        if (selectedType) {
            await updateOrCreatePlace()
            onNext()
        }
    }
    return (
        <>
            <View style={styles.container}>
                <FlatList ListHeaderComponent={<Text style={styles.title}>Choose your place type</Text>}
                          contentContainerStyle={styles.listContainer}
                          data={placeTypeList}
                          numColumns={3}
                          renderItem={({item, index}) => (<PickPlaceItem step={item}/>)}/>

                <AppButton extraStylesBtn={styles.button} onPress={preNext} fullWidth>
                    next
                </AppButton>
            </View>


        </>
    )
}
const styles = StyleSheet.create({
    container: {
        position: 'relative',
    },
    title: {
        fontSize: Theme.sizes.xl,
        fontWeight: "bold",
        textAlign: "center",
        marginVertical: 20,
    },
    listContainer: {
        paddingBottom: 100,
        gap: 20
    },
    placeItem: {
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 10,

    },
    placeText: {
        fontSize: Theme.sizes.sm,
        marginTop: 15,
        fontWeight: "bold",
        color: Theme.colors.gray.S600,
    },
    button: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        marginVertical: 30,
        marginHorizontal: 15

    },
    selected: {
        backgroundColor: Theme.colors.iconBackground,
        borderRadius: Theme.sizes.md,
    }
})