import {FlatList, Pressable, StyleSheet, Text, View} from "react-native";
import {WeddingSteps} from "@/types/open-api";
import {Theme} from "@/styles/Theme";
import AppButton from "@/components/appComponents/AppButton";
import IconStep from "@/components/symbols/IconStep";
import {useColors} from "@/utils/colors";


export default function PickPlaceType({selectedType, setSelectedType, onNext}: {
    selectedType: WeddingSteps | undefined,
    setSelectedType: (type: WeddingSteps) => void
    onNext: () => void
}) {
    const placeTypeList: WeddingSteps[] = Object.values(WeddingSteps)
    const getColorByStep = useColors()


    const PickPlaceItem = ({step}: { step: WeddingSteps }) => {
        return (
            <Pressable onPress={() => setSelectedType(step)}
                       style={[styles.placeItem, selectedType === step && styles.selected]}>
                <IconStep step={step} width={50} height={50} fill={getColorByStep(step)}/>
                <Text style={styles.placeText}>{step}</Text>
            </Pressable>
        )
    }

    const preNext = () => {
        if (selectedType) {
            onNext()
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