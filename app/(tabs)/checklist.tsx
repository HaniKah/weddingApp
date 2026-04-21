import React, {useCallback, useEffect, useState} from "react";
import {Alert, FlatList, StyleSheet, Text, View} from "react-native";
import {Theme} from "@/styles/Theme";
import {IconSymbol} from "@/components/symbols/IconSymbol";
import AppTextInput from "@/components/appComponents/AppTextInput";
import AppButton from "@/components/appComponents/AppButton";
import AppPicker from "@/components/appComponents/AppPicker";
import {ButtonType} from "@/styles/Button";
import AppPressable from "@/components/appComponents/AppPressable";
import AppSafeAreaView from "@/components/appComponents/AppSafeAreaView";
import {useApi} from "@/utils/api";
import {ChecklistDto, Timeframe} from "@/types/open-api";

export default function Checklist() {
    const [todos, setTodos] = useState<ChecklistDto[]>([]);
    const [newTodoTitle, setNewTodoTitle] = useState("");
    const [selectedTimeFrame, setSelectedTimeFrame] = useState<Timeframe>(Timeframe.Year);

    const {api} = useApi()

    const getTodos = useCallback(async () => {
        try {
            const res = await api.checklistControllerGetAllTasks()
            setTodos(res.data.result)
        } catch (err) {

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


    const handleAddTodo = async () => {
        if (!newTodoTitle.trim()) {
            Alert.alert("Error", "Please enter a todo title");
            return;
        }
        await addTodo(newTodoTitle, selectedTimeFrame);
        setNewTodoTitle("");
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
                            <IconSymbol size={28} color={Theme.colors.green.S700} name="checkmark.circle.fill"/>
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
        <AppSafeAreaView>
            <View style={styles.container}>
                <Text style={styles.header}>Wedding Checklist</Text>

                <View style={styles.addTodoContainer}>
                    <AppTextInput
                        name="todoTitle"
                        placeholder="What needs to be done?"
                        value={newTodoTitle}
                        onChange={setNewTodoTitle}
                        extraStyles={styles.input}
                    />
                    <AppPicker
                        name="timeFrame"
                        value={selectedTimeFrame}
                        onChange={(val) => setSelectedTimeFrame(val as Timeframe)}
                        itemList={Object.values(Timeframe).map(tf => ({name: tf, value: tf}))}
                        style={styles.picker}
                    />
                    <AppButton
                        buttonType={ButtonType.PRIMARY}
                        onPress={handleAddTodo}
                        fullWidth
                    >
                        Add to Checklist
                    </AppButton>
                </View>

                <FlatList
                    data={groupedTodos}
                    keyExtractor={(item) => item.timeFrame}
                    renderItem={({item}) => (
                        <View style={styles.sectionContainer}>
                            <View style={styles.sectionHeader}>
                                <Text style={styles.sectionTitle}>{item.timeFrame}</Text>
                                <View style={styles.sectionBadge}>
                                    <Text style={styles.badgeText}>
                                        {item.data.filter(t => t.isChecked).length}/{item.data.length}
                                    </Text>
                                </View>
                            </View>
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
                />
            </View>
        </AppSafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: Theme.colors.background,
    },
    container: {
        flex: 1,
        paddingHorizontal: Theme.global.appPadding,
    },
    header: {
        fontSize: Theme.sizes.xl,
        fontWeight: "bold",
        color: Theme.colors.primary,
        marginVertical: 15,
        fontFamily: Theme.typographies.aboreto,
    },
    addTodoContainer: {
        backgroundColor: Theme.colors.white,
        padding: 15,
        borderRadius: Theme.radius.md,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: Theme.colors.border,
        shadowColor: "#000",
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
    },
    input: {
        marginBottom: 5,
    },
    picker: {
        marginBottom: 10,
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
        fontWeight: "700",
        color: Theme.colors.secondary,
    },
    sectionBadge: {
        backgroundColor: Theme.colors.white,
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: Theme.radius.full,
    },
    badgeText: {
        fontSize: Theme.sizes.xs,
        fontWeight: "600",
        color: Theme.colors.primary,
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
        color: Theme.colors.gray.S400,
        fontStyle: "italic",
        marginTop: 5,
    },
});