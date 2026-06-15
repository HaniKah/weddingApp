import CategoryList from '@/components/CategoryList';
import AppSearchBar from '@/components/appComponents/AppSearchBar';
import {Dispatch, SetStateAction, useState} from 'react';
import {StyleSheet, Text} from 'react-native';
import {Theme} from '@/styles/Theme';
import WelcomeText from '@/components/WelcomeText';
import AppView from '@/components/appComponents/AppView';
import FilterModal from "@/components/modals/FilterModal";
import {SearchFilter} from "@/types/open-api";

export default function SearchHeader({
    
                                         filters,
                                         setFilters,
                                         searchText,
                                         setSearchText,
                                         onShowResult
                                     }: {
    filters: SearchFilter
    setFilters: Dispatch<SetStateAction<SearchFilter>>
    searchText: string | undefined,
    setSearchText: Dispatch<SetStateAction<string | undefined>>
    onShowResult: () => void


}) {
    const [filterVisible, setFilterVisible] = useState<boolean>(false);

    return (
        <>
            <AppView withPadding>
                <WelcomeText/>
                <AppSearchBar filterVisible={filterVisible}
                              setFilterVisible={setFilterVisible}
                              searchText={searchText}
                              setSearchText={setSearchText}/>
                <CategoryList
                    activeStep={filters?.category}
                    setActiveStep={setFilters}/>
                <Text style={styles.allVendors}>
                    All Vendors
                </Text>
            </AppView>
            <FilterModal setVisible={setFilterVisible}
                         isVisible={filterVisible}
                         searchText={searchText}
                         setSearchText={setSearchText}
                         filters={filters}
                         setFilters={setFilters}
                         onShowResult={onShowResult}
            />

        </>
    );
}

const styles = StyleSheet.create({
    allVendors: {
        marginVertical: 10,
        fontWeight: 'bold',
        fontSize: Theme.sizes.md,
        height: 'auto',
    },

});