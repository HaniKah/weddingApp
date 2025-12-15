import {PickerItem} from "@/components/appComponents/AppPicker";
import {useState} from "react";
import {FlatList, Pressable, StyleProp, StyleSheet, Text, View, ViewStyle} from "react-native";
import {Theme} from "@/styles/Theme";
import {IconSymbol} from "@/components/symbols/IconSymbol";
import AppBottomSheet from "@/components/appComponents/AppBottomSheet";

export default function AppDropDown<T>({itemList, label, value, onChange, style, title}: {
    style?: StyleProp<ViewStyle>,
    value: T | undefined,
    onChange: (value: T) => void,
    itemList: PickerItem<T>[],
    label?: string
    title?: string
}) {
    const [isVisible, setIsVisible] = useState(false)

    const onSelect = (selectedValue: T) => {
        onChange(selectedValue)
        setIsVisible(false)
    }

    function renderItem({item}: { item: PickerItem<T> }) {
        return (
            <Pressable style={styles.renderItem} onPress={() => onSelect(item.value)}>
                <Text>{item.name}</Text>
                {item.value === value && <IconSymbol name="checkmark" size={16} color={Theme.colors.primary}/>}
            </Pressable>
        )
    }

    return (
        <View>
            <Text>{label}</Text>
            <Pressable style={styles.pressable} onPress={() => setIsVisible(true)}>
                <Text>
                    {itemList.find(item => item.value === value)?.name ?? "Select an option"}
                </Text>
                <IconSymbol name="chevron.down" size={20} color={Theme.colors.gray.S400}/>
            </Pressable>

            <AppBottomSheet
                isVisible={isVisible}
                setIsVisible={setIsVisible}>
                <View style={styles.viewContainer}>
                    <Text style={styles.title}>{title}</Text>
                    <FlatList contentContainerStyle={styles.flatListContainer} data={itemList} renderItem={renderItem}/>

                </View>
            </AppBottomSheet>
        </View>

    )
}
const styles = StyleSheet.create({
    viewContainer: {
        padding: 10,
        paddingTop: 20,
    },
    title: {
        textAlign: "center",
        fontSize: Theme.sizes.md,
        fontWeight: "bold",
    },
    flatListContainer: {
        marginTop: 30
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
        paddingHorizontal: 15,
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: Theme.colors.gray.S300,

    },

})