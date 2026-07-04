import {ChecklistDto, useChecklistStore} from '@/utils/checklistStore';
import {Alert, StyleSheet, Text, View} from 'react-native';
import AppPressable from '@/components/appComponents/AppPressable';
import React from 'react';
import {Theme} from '@/styles/Theme';
import {IconSymbol} from '@/components/symbols/IconSymbol';
import {useTranslation} from 'react-i18next';

export default function TodoItem({item, index, total}: { item: ChecklistDto, index: number, total: number }) {

    const {t} = useTranslation();
    const {toggleTask, deleteTask} = useChecklistStore();

    const handleToggleTodo = async (id: number, currentStatus: boolean) => {
        toggleTask(id, !currentStatus);
    };

    const handleDeleteTodo = async (id: number) => {
        Alert.alert(
            t('checklist.deleteTodoTitle'),
            t('checklist.deleteTodoMessage'),
            [
                {text: t('common.cancel'), style: 'cancel'},
                {
                    text: t('profile.delete'),
                    style: 'destructive',
                    onPress: async () => {
                        deleteTask(id);
                    },
                },
            ],
        );
    };

    const isFirst = index === 0;
    const isLast = index === total - 1;

    return (
        <View style={styles.todoItemContainer}>
            <View style={styles.symbolContainer}>
                <View style={[styles.connectingLine, isFirst && styles.lineHidden]}/>
                <AppPressable onPress={() => handleToggleTodo(item.id, item.isChecked)}>
                    {item.isChecked ? (
                        <IconSymbol size={28} color={Theme.colors.primary} name="checkmark.circle.fill"/>
                    ) : (
                        <IconSymbol size={28} color={Theme.colors.primary} name="circle"/>
                    )}
                </AppPressable>
                <View style={[styles.connectingLine, isLast && styles.lineHidden]}/>
            </View>

            <View style={styles.todoTextContainer}>
                <Text style={[styles.todoTitle, item.isChecked && styles.completedText]}>
                    {item.task}
                </Text>
                <AppPressable onPress={() => handleDeleteTodo(item.id)}>
                    <IconSymbol name="trash" size={20} color={Theme.colors.red.S500}/>
                </AppPressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    todoItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    symbolContainer: {
        alignItems: 'center',
        width: 40,
    },
    connectingLine: {
        width: 1,
        flex: 1,
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
        borderBottomWidth: 1,
        borderBottomColor: Theme.colors.border,
    },
    todoTitle: {
        fontSize: Theme.sizes.md,
        color: Theme.colors.primary,
        flex: 1,
        paddingHorizontal: 10
    },
    completedText: {
        textDecorationLine: 'line-through',
        color: Theme.colors.textDisabled,
    },
});