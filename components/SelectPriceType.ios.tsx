import {PriceType} from "@/components/wizards/createPlaceWizard/FillPlaceInfo";
import {PickerItem} from "@/components/appComponents/AppPicker";
import {useState} from "react";
import {FlatList, Pressable, StyleProp, StyleSheet, Text, View, ViewStyle} from "react-native";
import AppModal from "@/components/appComponents/AppModal";
import {Theme} from "@/styles/Theme";
import {IconSymbol} from "@/components/symbols/IconSymbol";

export default function SelectPriceType({itemList, label, value, setValue, style}: {
    style?: StyleProp<ViewStyle>,
    value: PriceType | undefined,
    setValue: (value: PriceType) => void,
    itemList: PickerItem<PriceType>[],
    label?: string
}) {
    const [isVisible, setIsVisible] = useState(false)

    const onSelect = (selectedValue: PriceType) => {
        setValue(selectedValue)
        setIsVisible(false)
    }

    function renderItem({item}: { item: PickerItem<PriceType> }) {
        return (
            <Pressable style={styles.renderItem} onPress={() => onSelect(item.value)}>
                <Text>{item.label}</Text>
                {item.value === value && <IconSymbol name="checkmark" size={16} color={Theme.colors.primary}/>}
            </Pressable>
        )
    }

    return (
        <View style={style}>
            <Text>{label}</Text>
            <Pressable style={styles.pressable} onPress={() => setIsVisible(true)}>
                <Text>
                    {value ? value : "Pick your price type"}
                </Text>
                <IconSymbol name="chevron.down" size={20} color={Theme.colors.gray.S400}/>
            </Pressable>

            <AppModal allowSwipeDismissal={false}
                      presentationStyle="formSheet"
                      isVisible={isVisible}
                      setIsVisible={setIsVisible}>
                <View style={styles.viewContainer}>
                    <Text style={styles.title}>Select price type</Text>
                    <FlatList data={itemList} renderItem={renderItem}/>
                </View>
            </AppModal>
        </View>

    )
}
const styles = StyleSheet.create({
    viewContainer: {
        padding: 30,
        flex: 1
    },
    pressable: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 15,
        borderRadius: Theme.radius.sm,
        borderColor: Theme.colors.gray.S300,
        backgroundColor: Theme.colors.gray.S200,
        marginVertical: 10
    },
    renderItem: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: Theme.colors.gray.S300,

    },
    title: {
        textAlign: "center",
        fontSize: Theme.sizes.md,
        fontWeight: "bold",
    }
})