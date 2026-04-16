import { useEffect, useState } from 'react';
import { CountryCode, PlacesDto, SearchFilter, StepsDto } from '@/types/open-api';
import PlannerToolbar from '@/components/toolbars/PlannerToolbar';
import { Stack, useLocalSearchParams } from 'expo-router';
import AppView from '@/components/appComponents/AppView';
import { useApi } from '@/utils/api';
import PickPlaceHeader from '@/components/PickPlaceHeader';
import { FlatList } from 'react-native';
import PlaceItem from '@/components/items/PlaceItem';
import { useLocationContext } from '@/contexts/location-context';
import LocationAccessDenied from '@/components/errors/LocationAccessDenied';
import { REFRESH_DELAY } from '@/constants/general';


export default function Index() {

  const API = useApi().api;

  const { step } = useLocalSearchParams<{ step: string }>();

  const [isLoading, setLoading] = useState<boolean>(false);
  const [isRefreshing, setRefreshing] = useState<boolean>(false);


  const [steps, setSteps] = useState<StepsDto[]>();
  const [activeStep, setActiveStep] = useState<StepsDto>();


  const [places, setPlaces] = useState<PlacesDto[]>([]);

  const [searchText, setSearchText] = useState<string>();

  const [selectedFilter, setSelectedFilter] = useState<SearchFilter>();

  const [pagination, setPagination] = useState<number>(0);

  const { isLocationGranted, errorMsg, address } = useLocationContext();


  useEffect(() => {
    const getSteps = async () => {
      try {
        setLoading(true);
        const response = await API.plannerControllerGetSteps();
        setSteps(response.data.steps);
        setActiveStep(response.data.steps.find(s => s.step === step));

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    getSteps();
  }, [step]);


  function isCountryViable(country: string | null | undefined): boolean {
    if (!country) return false;
    return (country in CountryCode);
  }

  const getPlaces: (offset: number) => Promise<PlacesDto[]> = async (offset) => {

    if (!activeStep || !address?.isoCountryCode) return [];
    if (!isCountryViable(address?.isoCountryCode)) return [];

    let data: PlacesDto[] = [];
    try {
      const resp = await API.plannerControllerGetPlaces({
        step: activeStep?.step,
        search: searchText,
        filter: selectedFilter,
        offset: offset,
        countryCode: address?.isoCountryCode as CountryCode,
      });
      data = resp.data.places;
      // console.log(data)
    } catch (err) {
      console.log(err);
    }
    return data;
  };


  useEffect(() => {
    const fetch = async () => {
      setPagination(0);
      const resp = await getPlaces(0);
      setPlaces(resp);
    };
    fetch();

  }, [activeStep, steps, searchText, selectedFilter, address?.isoCountryCode]);


  useEffect(() => {
    if (pagination === 0) return;
    const fetch = async () => {
      const resp = await getPlaces(pagination);
      setPlaces((prev) => [...prev, ...resp]);
    };
    fetch();

  }, [pagination]);


  async function handleEndReached() {
    if (places.length === 0) return;
    setPagination(prev => prev + 1);
  }

  function handleRefresh() {
    setRefreshing(true);
    setPagination(0);
    setTimeout(async () => {
      const resp = await getPlaces(0);
      setPlaces(resp);
      setRefreshing(false);
    }, REFRESH_DELAY);
  }


  return (
    <>
      <Stack.Screen options={{ title: activeStep?.step, headerShown: false }} />
      {steps && activeStep &&
        <AppView withPadding isLoading={isLoading}>
          <PlannerToolbar />
          {isLocationGranted ? <FlatList
              ListHeaderComponent={
                <PickPlaceHeader stepsList={steps}
                                 activeStep={activeStep}
                                 setActiveStep={setActiveStep}
                                 searchText={searchText}
                                 setSearchText={setSearchText}
                                 selectedFilter={selectedFilter}
                                 setSelectedFilter={setSelectedFilter}
                                 places={places}
                />}
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
              data={places}
              renderItem={PlaceItem}
              scrollEventThrottle={100}
              onEndReached={handleEndReached}
              keyExtractor={(item, index) => index.toString()}
            /> :

            <LocationAccessDenied errorMsg={errorMsg} />
          }
        </AppView>
      }

    </>
  );
}

