import {Text, View} from "react-native";
import {Dispatch, SetStateAction} from "react";
import {PromotionInfoDto} from "@/components/wizards/promotePlaceWizard/PromotePlaceWizard";

export default function PromotionInfo({setPromotionInfo}: {
    setPromotionInfo: Dispatch<SetStateAction<PromotionInfoDto | undefined>>
}) {

    return (
        <View>
            <Text>
                this is the promotion info
            </Text>
        </View>
    )
}