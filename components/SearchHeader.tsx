import CategoryList from '@/components/CategoryList';
import AppSearchBar from '@/components/appComponents/AppSearchBar';
import { Categories } from '@/types/open-api';
import { Dispatch, SetStateAction } from 'react';
import { StyleSheet, Text } from 'react-native';
import { Theme } from '@/styles/Theme';
import WelcomeText from '@/components/WelcomeText';

export default function SearchHeader({

                                       activeCategory,
                                       setActiveCategory,
                                       searchText,
                                       setSearchText,
                                     }: {

  activeCategory: Categories | undefined,
  setActiveCategory: Dispatch<SetStateAction<Categories | undefined>>
  searchText: string | undefined,
  setSearchText: Dispatch<SetStateAction<string | undefined>>


}) {

  return (
    <>
      <WelcomeText />
      <AppSearchBar searchText={searchText} setSearchText={setSearchText} />
      <CategoryList

        activeStep={activeCategory}
        setActiveStep={setActiveCategory} />

      {/*<SearchFilters*/}
      {/*  selectedFilter={selectedFilter}*/}
      {/*  setSelectedFilter={setSelectedFilter} />*/}

      <Text style={styles.allVendors}>
        All Vendors
      </Text>
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