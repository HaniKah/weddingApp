import { useEffect, useState } from 'react';
import { useApi } from '@/utils/api';
import { FavouritePlacesDto } from '@/types/open-api';
import { Text } from 'react-native';
import AppView from '@/components/appComponents/AppView';

export default function Favorites() {
  const [favorites, setFavorites] = useState<FavouritePlacesDto[]>();
  const { api } = useApi();


  useEffect(() => {
    const getFavorites = async () => {
      const resp = await api.plannerControllerGetFavorites();
      setFavorites(resp.data.result);
    };

    getFavorites();
  }, []);


  return (
    <>
      <AppView>
        <Text>
          This is the fav page
        </Text>
        {favorites?.map(item => (<Text key={item.id}>
          {item.name}
        </Text>))}
      </AppView>

    </>
  );
}