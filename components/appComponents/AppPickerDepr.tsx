import {Picker} from "@react-native-picker/picker";
import {Text} from "react-native";
import AppBottomSheet from "@/components/appComponents/AppBottomSheet";

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

    return (
        <AppBottomSheet isVisible={true} setIsVisible={() => {
        }}>
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