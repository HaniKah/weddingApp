import React, {useState} from 'react';
import {FlatList, Keyboard, StyleSheet, Text, View} from 'react-native';
import {Theme} from '@/styles/Theme';
import {useChecklistStore} from '@/utils/checklistStore';
import AppView from '@/components/appComponents/AppView';
import {Stack} from 'expo-router';
import AppSafeAreaView from '@/components/appComponents/AppSafeAreaView';
import TodoItem from '@/components/items/TodoItem';
import AppKeyboardAvoidingView from '@/components/appComponents/AppKeyboardAvoidingView';
import {IconButton} from '@/components/symbols/IconButton';
import AppTextInput from '@/components/appComponents/AppTextInput';


import {useTranslation} from 'react-i18next';


export default function Checklist() {
    const {todos, todosHydrating, addTask} = useChecklistStore();
    const {t} = useTranslation();
    const [newTodoTitle, setNewTodoTitle] = useState<string>();

    const handleAddTodo = () => {
        if (!newTodoTitle?.trim()) return;
        addTask(newTodoTitle);
        setNewTodoTitle(undefined);
        Keyboard.dismiss();
    };

    const rehydrate = () => (useChecklistStore.persist.rehydrate());


    return (
        <>
            <Stack.Screen options={{headerShown: false}}/>
            <AppSafeAreaView>
                <AppKeyboardAvoidingView>
                    <AppView isLoading={todosHydrating} extraStyles={{backgroundColor: Theme.colors.background}}
                             withPadding>
                        <Text style={styles.header}>{t('checklist.header')}</Text>


                        <FlatList
                            refreshing={todosHydrating}
                            onRefresh={rehydrate}
                            data={todos}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({item, index}) => (
                                <TodoItem item={item} index={index} total={todos.length}/>
                            )}
                            contentContainerStyle={styles.listContent}
                            showsVerticalScrollIndicator={false}
                            ListEmptyComponent={
                                <Text style={styles.emptyText}>{t('checklist.noTasksYet')}</Text>
                            }
                        />
                        <View style={styles.inputContainer}>
                            <AppTextInput
                                design={2}
                                name="todoTitle"
                                placeholder={t('checklist.todoPlaceholder')}
                                value={newTodoTitle}
                                onChange={setNewTodoTitle}
                                extraStyles={styles.input}
                            />
                            {newTodoTitle?.trim() &&
                                <IconButton
                                    name="checkmark"
                                    color={Theme.colors.white}
                                    onPress={handleAddTodo}
                                    extraStylesBtn={styles.addButton}
                                />
                            }


                        </View>

                    </AppView>

                </AppKeyboardAvoidingView>
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
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        position: 'absolute',
        alignSelf: 'center',
        bottom: 10,
        backgroundColor: Theme.colors.background,
        paddingTop: 10,
    },
    input: {
        borderRadius: Theme.radius.full,
        paddingLeft: 10
    },
    addButton: {
        backgroundColor: Theme.colors.primary,
        borderRadius: Theme.radius.full,
        width: 45,
        height: 45,
    },
    listContent: {
        paddingBottom: 40,
    },
    emptyText: {
        textAlign: 'center',
        color: Theme.colors.placeholder,
        fontStyle: 'italic',
        marginTop: 20,
    },

});