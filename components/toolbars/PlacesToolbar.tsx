import Toolbar from "@/components/toolbars/Toolbar";
import {IconSymbol} from "@/components/symbols/IconSymbol";
import {Theme} from "@/styles/Theme";
import {ButtonStyles} from "@/styles/Button";
import {Pressable, View} from "react-native";

export default function GuestsToolbar({onCreatePlace}: { onCreatePlace: () => void }) {
    return (
        <>
            <Toolbar style={{flexDirection: "row-reverse", padding: 20}}>
                <Pressable onPress={onCreatePlace}>
                    <View style={ButtonStyles.iconBtn}>
                        <IconSymbol name="plus" color={Theme.colors.primary} size={Theme.sizes.lg}
                                    weight={'bold'}/>
                    </View>
                </Pressable>

            </Toolbar>
        </>
    )
}