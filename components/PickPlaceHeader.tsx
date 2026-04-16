import StepsHeader from '@/components/StepsHeader';
import AppSearchBar from '@/components/appComponents/AppSearchBar';
import { PlacesDto, SearchFilter, StepsDto } from '@/types/open-api';
import { Dispatch, SetStateAction } from 'react';
import { StyleSheet, Text } from 'react-native';
import { Theme } from '@/styles/Theme';

export default function PickPlaceHeader({
                                          stepsList,
                                          activeStep,
                                          setActiveStep,
                                          searchText,
                                          setSearchText,
                                          selectedFilter,
                                          setSelectedFilter,
                                          places,
                                        }: {
  stepsList: StepsDto[],
  activeStep: StepsDto,
  setActiveStep: Dispatch<SetStateAction<StepsDto | undefined>>
  searchText: string | undefined,
  setSearchText: Dispatch<SetStateAction<string | undefined>>
  selectedFilter: SearchFilter | undefined
  setSelectedFilter: Dispatch<SetStateAction<SearchFilter | undefined>>
  places: PlacesDto[]
}) {

  return (
    <>
      <AppSearchBar searchText={searchText} setSearchText={setSearchText} />
      <StepsHeader
        stepsList={stepsList}
        activeStep={activeStep}
        setActiveStep={setActiveStep} />

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