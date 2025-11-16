import AppPicker, {PickerItem} from "@/components/appComponents/AppPicker";
import {StyleProp, ViewStyle} from "react-native";
import {PriceType} from "@/components/wizards/createPlaceWizard/FillPlaceInfo";

export default function SelectPriceType({itemList, label, value, setValue, style}: {
    style?: StyleProp<ViewStyle>,
    value: PriceType | undefined,
    setValue: (value: PriceType) => void,
    itemList: PickerItem<PriceType>[],
    label?: string
}) {
    return (
        <>
            <AppPicker value={value} setValue={setValue} itemList={itemList} label={label}/>
        </>
    )
}