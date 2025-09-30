import {Animated} from "react-native";
import AppView from "@/components/appComponents/AppView";
import CheckItem from "@/components/items/checkItem";
import {WeddingSteps} from "@/types/open-api";
import ScrollView = Animated.ScrollView;

export default function Checklist() {
    return (
        <>
            <AppView>
                <ScrollView>
                    <CheckItem step={WeddingSteps.Host} placeId={2} placeName="Host 2" isCompleted={true}/>
                </ScrollView>
            </AppView>
        </>
    )
}