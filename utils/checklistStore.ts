import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ChecklistDto, Timeframe } from '@/types/open-api';

interface ChecklistState {
  todos: ChecklistDto[];
  addTask: (task: string, timeframe: Timeframe) => void;
  toggleTask: (taskId: number, isChecked: boolean) => void;
  deleteTask: (taskId: number) => void;
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
    }),
    {
      name: 'checklist-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
