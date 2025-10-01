import {Animated, FlatList} from "react-native";
import AppView from "@/components/appComponents/AppView";
import CheckItem from "@/components/items/checkItem";
import {ChecklistViewModel} from "@/types/open-api";
import {useEffect, useState} from "react";
import {API} from "@/utils/api";


export default function Checklist() {
    const [checklist, setChecklist] = useState<ChecklistViewModel>()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const getChecklist = async () => {
            try {
                const response = await API.plannerControllerGetChecklist()
                setChecklist(response.data)
            } catch (error) {
                console.error(error)
            } finally {
                setIsLoading(false)
            }
        }
        getChecklist()
    }, []);

    return (
        <>
            <AppView isLoading={isLoading}>
                <FlatList data={checklist?.list} renderItem={CheckItem}/>
            </AppView>
        </>
    )
}