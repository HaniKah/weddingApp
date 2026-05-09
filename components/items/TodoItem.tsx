import { ChecklistDto, Timeframe, useChecklistStore } from '@/utils/checklistStore';
import { Alert, StyleSheet, Text, View } from 'react-native';
import AppPressable from '@/components/appComponents/AppPressable';
import React, { useState } from 'react';
import { Theme } from '@/styles/Theme';
import { IconSymbol } from '@/components/symbols/IconSymbol';
import { IconButton } from '@/components/symbols/IconButton';
import AppTextInput from '@/components/appComponents/AppTextInput';
import { useTranslation } from 'react-i18next';
import { GroupedTodos } from '@/app/(tabs)/checklist';

export default function TodoItem({ item }: { item: GroupedTodos }) {

  const { t } = useTranslation();

  const { addTask, toggleTask, deleteTask } = useChecklistStore();
  const [newTodoTitle, setNewTodoTitle] = useState<string>();
  const [addingToTimeFrame, setAddingToTimeFrame] = useState<Timeframe>();
  const handleAddTodo = async (timeframe: Timeframe) => {
    if (!newTodoTitle?.trim()) {
      setAddingToTimeFrame(undefined);
      return;
    }
    addTask(newTodoTitle, timeframe);
    setNewTodoTitle(undefined);
    setAddingToTimeFrame(undefined);
  };
  const handleToggleTodo = async (id: number, currentStatus: boolean) => {
    toggleTask(id, !currentStatus);
  };


  const handleDeleteTodo = async (id: number) => {
    Alert.alert(
      'Delete Todo',
      'Are you sure you want to delete this item?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            deleteTask(id);
          },
        },
      ],
    );
  };

  const renderTodoItem = ({ item, index, sectionData }: {
    item: ChecklistDto,
    index: number,
    sectionData: ChecklistDto[]
  }) => {
    const isFirst = index === 0;
    const isLast = index === sectionData.length - 1;

    return (
      <View style={styles.todoItemContainer}>
        <View style={styles.symbolContainer}>
          <View style={[styles.connectingLine, isFirst && styles.lineHidden]} />
          <AppPressable onPress={() => handleToggleTodo(item.id, item.isChecked)}>
            {item.isChecked ? (
              <IconSymbol size={28} color={Theme.colors.primary} name="checkmark.circle.fill" />
            ) : (
              <IconSymbol size={28} color={Theme.colors.primary} name="circle" />
            )}
          </AppPressable>
          <View style={[styles.connectingLine, isLast && styles.lineHidden]} />
        </View>

        <View style={styles.todoTextContainer}>
          <Text style={[styles.todoTitle, item.isChecked && styles.completedText]}>
            {item.task}
          </Text>
          <AppPressable onPress={() => handleDeleteTodo(item.id)}>
            <IconSymbol name="trash" size={20} color={Theme.colors.red.S500} />
          </AppPressable>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.sectionContainer}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{t('timeframe.' + item.timeframe)}</Text>
        <View style={styles.headerActions}>
          <View style={styles.sectionBadge}>
            <Text style={styles.badgeText}>
              {item.data.filter(t => t.isChecked).length}/{item.data.length}
            </Text>
          </View>
          <IconButton
            name="plus"
            size={18}
            onPress={() => {
              if (addingToTimeFrame === item.timeframe) {
                setAddingToTimeFrame(undefined);
              } else {
                setAddingToTimeFrame(item.timeframe as Timeframe);
                setNewTodoTitle('');
              }
            }}
          />
        </View>
      </View>

      {addingToTimeFrame === item.timeframe && (
        <View style={styles.inlineAddContainer}>
          <AppTextInput
            design={2}
            name="todoTitle"
            placeholder="What needs to be done?"
            value={newTodoTitle}
            onChange={setNewTodoTitle}
            extraStyles={styles.inlineInput}
            onBlur={() => {
              if (!newTodoTitle?.trim()) {
                setAddingToTimeFrame(undefined);
              }
            }}
          />
          <IconButton
            name="checkmark"
            color={Theme.colors.green.S700}
            onPress={() => handleAddTodo(item.timeframe as Timeframe)}
          />
        </View>
      )}

      {item.data.length > 0 ? (
        item.data.map((todo, idx) => (
          <React.Fragment key={todo.id}>
            {renderTodoItem({ item: todo, index: idx, sectionData: item.data })}
          </React.Fragment>
        ))
      ) : (
        <Text style={styles.emptyText}>No tasks yet</Text>
      )}
    </View>
  );

}
const styles = StyleSheet.create({
  sectionContainer: {
    marginBottom: 25,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Theme.colors.iconBackground,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: Theme.radius.sm,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: Theme.sizes.md,
    fontWeight: 'bold',
    color: Theme.colors.secondary,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  todoItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  symbolContainer: {
    alignItems: 'center',
    width: 40,
  },
  connectingLine: {
    width: 1,
    height: 15,
    backgroundColor: Theme.colors.border,
  },
  lineHidden: {
    backgroundColor: 'transparent',
  },
  todoTextContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingLeft: 10,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.border,
  },
  todoTitle: {
    fontSize: Theme.sizes.md,
    color: Theme.colors.primary,
    flex: 1,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: Theme.colors.textDisabled,
  },
  emptyText: {
    textAlign: 'center',
    color: Theme.colors.placeholder,
    fontStyle: 'italic',
    marginTop: 5,
  },
  sectionBadge: {
    paddingVertical: 2,
    borderRadius: Theme.radius.full,
  },
  badgeText: {
    fontSize: Theme.sizes.xs,
    color: Theme.colors.secondary,
  },
  inlineAddContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    gap: 10,

  },
  inlineInput: {
    flex: 1,
  },
});