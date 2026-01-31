import {Picker} from "@react-native-picker/picker";
import {Text} from "react-native";
import AppBottomSheet, {AppBottomSheetRef} from "@/components/appComponents/AppBottomSheet";
import {useRef} from "react";

export type PickerItem<P> = {
    name: string;
    value: P;
}

export default function AppPickerDepr<T>({itemList, label, value, setValue}: {
    value: T | undefined,
    setValue: (value: T) => void
    itemList: PickerItem<T>[],
    label?: string
}) {
    const ref = useRef<AppBottomSheetRef>(null)

    return (
        <AppBottomSheet ref={ref}>
            <Text>
                {label}
            </Text>
            <Picker
                selectedValue={value}
                onValueChange={(itemValue, itemIndex) =>
                    setValue(itemValue)
                }>
                {itemList.map((item, i) => {
                    return (

                        <Picker.Item key={i} label={item.name} value={item.value}/>
                    )
                })}

            </Picker>
        </AppBottomSheet>


    )
}