import Toolbar from "@/components/toolbars/Toolbar";

import {StyleSheet, Text, View} from "react-native";
import {Theme} from "@/styles/Theme";
import * as Progress from 'react-native-progress';
import {IconSymbol} from "@/components/symbols/IconSymbol";
import {Link} from "expo-router";
import {ButtonStyles} from "@/styles/Button";


export default function PlannerToolbar({progress, note, fullfilled}: {
    progress: number,
    note: string,
    fullfilled: boolean,
}) {
    return (
        <>
            <Toolbar>
                <View style={styles.progressContainer}>
                    {fullfilled ?
                        <IconSymbol color={Theme.colors.green["S100"]} name="checkmark.circle.fill"/> :

                        <Progress.Pie style={styles.pie} progress={progress} size={20} color={Theme.colors.primary}
                                      borderWidth={2}/>
                    }

                    <Text style={[styles.note, fullfilled && styles.filled]}>{note}</Text>
                </View>


                <Link style={styles.checklistBtn} push href="/(tabs)/(planner)/checklist">
                    <View style={ButtonStyles.iconBtn}>
                        <IconSymbol name="checklist" color={Theme.colors.primary} size={Theme.sizes.lg}
                                    weight={'bold'}/>
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
        gap: 7
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
    },
    filled: {
        color: Theme.colors.green["S100"],
        fontWeight: "bold"
    }
})