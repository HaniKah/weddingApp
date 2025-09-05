import Toolbar from "@/components/toolbars/Toolbar";

import {StyleSheet, View} from "react-native";
import {ComponentStyles, Theme} from "@/constants/Theme";
import * as Progress from 'react-native-progress';
import {IconSymbol} from "@/components/ui/IconSymbol";
import {Link} from "expo-router";


export default function PlannerToolbar() {
    return (
        <>
            <Toolbar>
                
                <Progress.Pie style={styles.pie} progress={0.4} size={25} color={Theme.colors.primary}
                              borderWidth={2}/>


                <Link style={styles.checklistBtn} push href="/(tabs)/(planner)/checklist">
                    <View style={ComponentStyles.iconBtn}>
                        <IconSymbol name="checklist" color={Theme.colors.primary} size={20} weight={'bold'}/>
                    </View>
                </Link>
            </Toolbar>

        </>
    )
}
const styles = StyleSheet.create({

    pie: {
        alignSelf: "center",
    },
    checklistBtn: {
        marginLeft: "auto",
    },
    skipBtn: {
        alignSelf: "flex-end",
    }
})