import React from 'react';
import { FlatList, StyleSheet, Text } from 'react-native';
import { Theme } from '@/styles/Theme';
import { ChecklistDto, Timeframe, useChecklistStore } from '@/utils/checklistStore';
import AppView from '@/components/appComponents/AppView';
import { Stack } from 'expo-router';
import AppSafeAreaView from '@/components/appComponents/AppSafeAreaView';
import TodoItem from '@/components/items/TodoItem';


export interface GroupedTodos {
  timeframe: Timeframe,
  data: ChecklistDto[]
}

export default function Checklist() {
  const { todos, todosHydrating } = useChecklistStore();

  const groupedTodos: GroupedTodos[] = Object.values(Timeframe).map(tf => ({
    timeframe: tf,
    data: todos.filter(todo => todo.timeframe === tf),
  }));

  const rehydrate = () => (useChecklistStore.persist.rehydrate());


  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <AppSafeAreaView>
        <AppView isLoading={todosHydrating} extraStyles={{ backgroundColor: Theme.colors.background }} withPadding>
          <Text style={styles.header}>Wedding Checklist</Text>
          <FlatList
            refreshing={todosHydrating}
            onRefresh={rehydrate}
            data={groupedTodos}
            keyExtractor={(item) => item.timeframe}
            renderItem={({ item }) => (
              <TodoItem item={item} />
            )}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        </AppView>
      </AppSafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({

  header: {
    fontSize: Theme.sizes.xl,
    fontWeight: 'bold',
    color: Theme.colors.primary,
    marginVertical: 15,
  },
  listContent: {
    paddingBottom: 40,
  },

});