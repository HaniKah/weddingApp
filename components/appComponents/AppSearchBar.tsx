import AppTextInput from './AppTextInput';
import { StyleSheet, View } from 'react-native';

export default function AppSearchBar({ searchText, setSearchText }: {
  searchText: string | undefined,
  setSearchText: (value: string) => void
}) {

  return (
    <>
      <View style={styles.container}>
        <AppTextInput design={2}
                      placeholder="search"
                      value={searchText}
                      name="search"
                      onChange={(text) => setSearchText(text)}
        />
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
    marginTop: 5,
  },
});