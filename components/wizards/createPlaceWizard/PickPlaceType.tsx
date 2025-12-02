import {FlatList, Pressable, StyleSheet, Text, View} from "react-native";
import {CreatePlaceSteps, VendorPlaceDetailsViewModel, WeddingSteps} from "@/types/open-api";
import {Theme} from "@/styles/Theme";
import AppButton from "@/components/appComponents/AppButton";
import IconStep from "@/components/symbols/IconStep";
import {useColors} from "@/utils/colors";
import {useApi} from "@/utils/api";
import {useState} from "react";


export default function PickPlaceType({onNext, data, setData, placeId}: {
    placeId: number | undefined
    data: VendorPlaceDetailsViewModel | undefined,
    setData: (data: VendorPlaceDetailsViewModel) => void,
    onNext: () => void
}) {

    const API = useApi()
    const placeTypeList: WeddingSteps[] = Object.values(WeddingSteps)
    const getColorByStep = useColors()

    const [weddingStep, setWeddingStep] = useState<WeddingSteps | undefined>(data?.place.weddingStep)


    const PickPlaceItem = ({step}: { step: WeddingSteps }) => {
        return (
            <Pressable onPress={() => setWeddingStep(step)}
                       style={[styles.placeItem, weddingStep === step && styles.selected]}>
                <IconStep step={step} width={50} height={50} fill={getColorByStep(step)}/>
                <Text style={styles.placeText}>{step}</Text>
            </Pressable>
        )
    }

    const preNext = () => {
        if (weddingStep) {
            updateOrCreatePlace()
            onNext()
        }
    }

    async function updateOrCreatePlace() {
        try {
            const res = await API.placesControllerUpdatePlace({
                placeId: placeId,
                weddingStep: weddingStep,
                createStep: CreatePlaceSteps.PickPlaceType
            })
            setData(res.data)
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <>
            <View style={styles.container}>
                <FlatList ListHeaderComponent={<Text style={styles.title}>Choose your place type</Text>}
                          contentContainerStyle={styles.listContainer} data={placeTypeList} numColumns={3}
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