import {FlatList} from "react-native";
import AppView from "@/components/appComponents/AppView";
import {ChecklistViewModel} from "@/types/open-api";
import {useCallback, useEffect, useState} from "react";

import CheckItem from "@/components/items/CheckItem";
import {useApi} from "@/utils/api";
import {REFRESH_DELAY} from "@/constants/general";


export default function Checklist() {
    const {api} = useApi()
    const [checklist, setChecklist] = useState<ChecklistViewModel>()
    const [isLoading, setIsLoading] = useState(false)
    const [isRefreshing, setIsRefreshing] = useState(false)

    const getChecklist = useCallback(async () => {
        try {
            const response = await api.plannerControllerGetChecklist()
            setChecklist(response.data)
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }, [])


    useEffect(() => {
        setIsLoading(true)
        getChecklist().then(() => setIsLoading(false))

    }, [getChecklist]);

    function handleRefresh() {
        setIsRefreshing(true)
        setTimeout(async () => {
            await getChecklist()
            setIsRefreshing(false)
        }, REFRESH_DELAY)
    }

    return (
        <>
            <AppView withPadding isLoading={isLoading}>
                <FlatList data={checklist?.list}
                          refreshing={isRefreshing}
                          onRefresh={handleRefresh}
                          keyExtractor={(data, index) => index.toString()}
                          renderItem={({item, index}) => (
                              <CheckItem item={item} firstItem={index === 0}
                                         lastItem={index + 1 === checklist?.list.length}
                              />)}/>
            </AppView>
        </>
    )
}