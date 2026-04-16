import AppTextInput from './AppTextInput';
import { StyleSheet, View } from 'react-native';
import { Theme } from '@/styles/Theme';

export default function AppSearchBar({ searchText, setSearchText }: {
  searchText: string | undefined,
  setSearchText: (value: string) => void
}) {

  return (
    <>
      <View style={styles.container}>
        <AppTextInput debounceTime={300}
                      design={2}
                      placeholder="search"
                      value={searchText}
                      name="search"
                      onTextChange={(text) => setSearchText(text)}
                      extraStyles={styles.input}
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
  input: {
    borderRadius: Theme.radius.md,
    overflow: 'hidden',
  },
});