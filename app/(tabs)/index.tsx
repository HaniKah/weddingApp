import Toolbar from "@/components/Toolbar";
import {IconSymbol} from "@/components/ui/IconSymbol";
import {Colors} from "@/constants/Colors";
import {Text} from "react-native";

export default function Index() {
    return (
        <>
            <Toolbar>
                <IconSymbol size={24} name="checklist" color={Colors.primary}/>
            </Toolbar>
            <Text>
                here should come the wizard
            </Text>

        </>)

}
