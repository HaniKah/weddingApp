import React, {useCallback, useEffect, useState} from "react";
import {Alert, FlatList, StyleSheet, Text, View} from "react-native";
import {Theme} from "@/styles/Theme";
import {IconSymbol} from "@/components/symbols/IconSymbol";
import AppTextInput from "@/components/appComponents/AppTextInput";
import AppPressable from "@/components/appComponents/AppPressable";
import {useApi} from "@/utils/api";
import {ChecklistDto, Timeframe} from "@/types/open-api";
import {IconButton} from "@/components/symbols/IconButton";
import AppView from "@/components/appComponents/AppView";
import {Stack} from "expo-router";
import AppSafeAreaView from "@/components/appComponents/AppSafeAreaView";
import {useTranslation} from "react-i18next";

export default function Checklist() {
    const [todos, setTodos] = useState<ChecklistDto[]>([]);
    const [newTodoTitle, setNewTodoTitle] = useState("");
    const [addingToTimeFrame, setAddingToTimeFrame] = useState<Timeframe | null>(null);
    const [isloading, setIsLoading] = useState(false);

    const {api} = useApi()
    const {t} = useTranslation()

    const getTodos = useCallback(async () => {
        try {
            setIsLoading(true)
            const res = await api.checklistControllerGetAllTasks()
            setTodos(res.data.result)
        } catch (err) {

        } finally {
            setIsLoading(false)
        }
    }, [])

    useEffect(() => {
        getTodos()
    }, []);

    const addTodo = async (title: string, timeFrame: Timeframe) => {
        await api.checklistControllerCreateTask({task: title, timeframe: timeFrame})
    }

    const toggleTodo = async (id: number, isChecked: boolean) => {
        await api.checklistControllerToggleTask({taskId: id, isChecked: isChecked})
    }


    const handleAddTodo = async (timeframe: Timeframe) => {
        if (!newTodoTitle.trim()) {
            setAddingToTimeFrame(null);
            return;
        }
        await addTodo(newTodoTitle, timeframe);
        setNewTodoTitle("");
        setAddingToTimeFrame(null);
        getTodos();
    };

    const handleToggleTodo = async (id: number, currentStatus: boolean) => {
        await toggleTodo(id, !currentStatus);
        getTodos();
    };

    const deleteTodo = async (id: number) => {
        await api.checklistControllerDeleteTask({taskId: id})
    }

    const handleDeleteTodo = async (id: number) => {
        Alert.alert(
            "Delete Todo",
            "Are you sure you want to delete this item?",
            [
                {text: "Cancel", style: "cancel"},
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: async () => {
                        await deleteTodo(id);
                        getTodos();
                    }
                }
            ]
        );
    };

    const groupedTodos = Object.values(Timeframe).map(tf => ({
        timeFrame: tf,
        data: todos.filter(todo => todo.timeframe === tf)
    }));

    const renderTodoItem = ({item, index, sectionData}: {
        item: ChecklistDto,
        index: number,
        sectionData: ChecklistDto[]
    }) => {
        const isFirst = index === 0;
        const isLast = index === sectionData.length - 1;

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
    };

    return (
        <>
            <Stack.Screen options={{headerShown: false}}/>
            <AppSafeAreaView>
                <AppView extraStyles={{backgroundColor: Theme.colors.background}} withPadding>
                    <Text style={styles.header}>Wedding Checklist</Text>
                    <FlatList
                        data={groupedTodos}
                        keyExtractor={(item) => item.timeFrame}
                        renderItem={({item}) => (
                            <View style={styles.sectionContainer}>
                                <View style={styles.sectionHeader}>
                                    <Text style={styles.sectionTitle}>{t("timeframe." + item.timeFrame)}</Text>
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
                                                if (addingToTimeFrame === item.timeFrame) {
                                                    setAddingToTimeFrame(null);
                                                } else {
                                                    setAddingToTimeFrame(item.timeFrame as Timeframe);
                                                    setNewTodoTitle("");
                                                }
                                            }}
                                        />
                                    </View>
                                </View>

                                {addingToTimeFrame === item.timeFrame && (
                                    <View style={styles.inlineAddContainer}>
                                        <AppTextInput
                                            name="todoTitle"
                                            placeholder="What needs to be done?"
                                            value={newTodoTitle}
                                            onChange={setNewTodoTitle}
                                            extraStyles={styles.inlineInput}
                                            onBlur={() => {
                                                if (!newTodoTitle.trim()) {
                                                    setAddingToTimeFrame(null);
                                                }
                                            }}
                                        />
                                        <IconButton
                                            name="checkmark"
                                            color={Theme.colors.green.S700}
                                            onPress={() => handleAddTodo(item.timeFrame as Timeframe)}
                                        />
                                    </View>
                                )}

                                {item.data.length > 0 ? (
                                    item.data.map((todo, idx) => (
                                        <React.Fragment key={todo.id}>
                                            {renderTodoItem({item: todo, index: idx, sectionData: item.data})}
                                        </React.Fragment>
                                    ))
                                ) : (
                                    <Text style={styles.emptyText}>No tasks yet</Text>
                                )}
                            </View>
                        )}
                        contentContainerStyle={styles.listContent}
                        showsVerticalScrollIndicator={false}
                        refreshing={isloading}
                        onRefresh={getTodos}
                    />
                </AppView>
            </AppSafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({

    header: {
        fontSize: Theme.sizes.xl,
        fontWeight: "bold",
        color: Theme.colors.primary,
        marginVertical: 15,
    },
    listContent: {
        paddingBottom: 40,
    },
    sectionContainer: {
        marginBottom: 25,
    },
    sectionHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: Theme.colors.iconBackground,
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: Theme.radius.sm,
        marginBottom: 10,
    },
    sectionTitle: {
        fontSize: Theme.sizes.md,
        fontWeight: "bold",
        color: Theme.colors.secondary,
    },
    headerActions: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
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
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15,
        gap: 10,
        backgroundColor: Theme.colors.white,
        padding: 8,
        borderRadius: Theme.radius.md,
        borderWidth: 1,
        borderColor: Theme.colors.border,
    },
    inlineInput: {
        flex: 1,
    },
    todoItemContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 5,
    },
    symbolContainer: {
        alignItems: "center",
        width: 40,
    },
    connectingLine: {
        width: 1,
        height: 15,
        backgroundColor: Theme.colors.border,
    },
    lineHidden: {
        backgroundColor: "transparent",
    },
    todoTextContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
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
        textDecorationLine: "line-through",
        color: Theme.colors.textDisabled,
    },
    emptyText: {
        textAlign: "center",
        color: Theme.colors.placeholder,
        fontStyle: "italic",
        marginTop: 5,
    },
});