import {FlatList} from "react-native";
import AppView from "@/components/appComponents/AppView";
import {ChecklistViewModel} from "@/types/open-api";
import {useEffect, useState} from "react";

import CheckItem from "@/components/items/CheckItem";
import {useApi} from "@/utils/api";


export default function Checklist() {
    const API = useApi().api
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
            <AppView withPadding isLoading={isLoading}>
                <FlatList data={checklist?.list}
                          keyExtractor={(data, index) => index.toString()}
                          renderItem={({item, index}) => (
                              <CheckItem item={item} firstItem={index === 0}
                                         lastItem={index + 1 === checklist?.list.length}
                              />)}/>
            </AppView>
        </>
    )
}