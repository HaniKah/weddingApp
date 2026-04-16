import { Stack } from 'expo-router';
import { Theme } from '@/styles/Theme';

export default function ProfileLayout() {
  return (
    <Stack screenOptions={{ headerStyle: { backgroundColor: Theme.colors.background }, headerShown: true }} />
  );
}