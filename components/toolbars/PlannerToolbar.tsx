import Toolbar from "@/components/toolbars/Toolbar";

import {StyleSheet, Text, View} from "react-native";
import {ComponentStyles, Theme} from "@/constants/Theme";
import * as Progress from 'react-native-progress';
import {IconSymbol} from "@/components/ui/IconSymbol";
import {Link} from "expo-router";


export default function PlannerToolbar({progress, note}: {
    progress: number,
    note: string
}) {
    return (
        <>
            <Toolbar>
                <View style={styles.progressContainer}>
                    <Progress.Pie style={styles.pie} progress={progress} size={25} color={Theme.colors.primary}
                                  borderWidth={2}/>
                    <Text style={styles.note}>{note}</Text>
                </View>


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
    progressContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 10
    },
    note: {
        color: Theme.colors.primary,
    },
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