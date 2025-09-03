import Toolbar from "@/components/toolbars/Toolbar";

import {Pressable, StyleSheet, Text, View} from "react-native";
import {ComponentStyles, Theme} from "@/constants/Theme";
import {WeddingSteps} from "@/types/open-api";
import * as Progress from 'react-native-progress';
import {IconSymbol} from "@/components/ui/IconSymbol";
import {Link} from "expo-router";


export default function PlannerToolbar({currentStep, onSkipStep, isLastStep}: {
    currentStep: WeddingSteps,
    onSkipStep: () => void,
    isLastStep: boolean,
}) {
    return (
        <>
            <Toolbar>
                <Link href="/(tabs)/(planner)/guest-list">
                    <View style={ComponentStyles.iconBtn}>
                        <IconSymbol name="checklist" color={Theme.colors.primary} size={20} weight={'bold'}/>
                    </View>
                </Link>


                <Progress.Pie progress={0.4} size={20} color={Theme.colors.primary} borderWidth={2}/>
                {!isLastStep &&
                    <Pressable style={styles.skipBtn} onPress={() => onSkipStep()}>
                        <Text style={styles.skipTxt}>Skip</Text>
                    </Pressable>
                }
            </Toolbar>

        </>
    )
}
const styles = StyleSheet.create({
    skipBtn: {
        alignSelf: 'flex-end',
    },
    skipTxt: {
        color: Theme.colors.primary
    }
})