import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ChecklistState {
  todos: ChecklistDto[];
  addTask: (task: string, timeframe: Timeframe) => void;
  toggleTask: (taskId: number, isChecked: boolean) => void;
  deleteTask: (taskId: number) => void;
  todosHydrating: boolean;
  setTodosHydrating: (value: boolean) => void;
}

export enum Timeframe {
  Year = 'Year',
  NineMonths = 'NineMonths',
  SixMonths = 'SixMonths',
  ThreeMonths = 'ThreeMonths',
  OneMonth = 'OneMonth',
  LastWeek = 'LastWeek',
  LastDay = 'LastDay',
  BigDay = 'BigDay',
}

export interface ChecklistDto {
  timeframe: Timeframe;
  id: number;
  task: string;
  isChecked: boolean;
}

export const useChecklistStore = create<ChecklistState>()(
  persist(
    (set) => ({
      todos: [],
      addTask: (task, timeframe) =>
        set((state) => ({
          todos: [
            ...state.todos,
            {
              id: Date.now(), // Use timestamp as a simple unique ID for local storage
              task,
              timeframe,
              isChecked: false,
            },
          ],
        })),
      toggleTask: (taskId, isChecked) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === taskId ? { ...todo, isChecked } : todo,
          ),
        })),
      deleteTask: (taskId) =>
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== taskId),
        })),
      todosHydrating: true,
      setTodosHydrating: (value: boolean) => set({ todosHydrating: value }),
    }),
    {
      name: 'checklist-storage',
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state, error) => {
        if (!error) {
          state?.setTodosHydrating(false);
        }
      },
    },
  ),
);
