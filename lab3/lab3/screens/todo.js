import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    TextInput,
    Button,
    FlatList,
    TouchableOpacity,
} from "react-native";
import styles from "../style/styles";

export default function TodoListScreen() {
    const [todo, setTodo] = useState("");
    const [todoList, settodoList] = useState([]);
    const [todoError, setTodoError] = useState("");
    const [todoListRemaining, settodoListRemaining] = useState(0);

    const handleAddTodo = () => {
        if (todo.length > 0) {
            const newTodo = {
                id: Date.now().toString(),
                todo: todo,
                complete: false,
            };

            settodoList([...todoList, newTodo]);
            setTodo("");
            setTodoError("");
        } else {
            setTodoError("ERROR: InValid Format, Please Enter a Valid Format");
        }
    };

    const handleDeleteTodo = (id) => {
        const filteredtodoList = todoList.filter((item) => item.id !== id);
        settodoList(filteredtodoList);
    };

    const handleCompleteTodo = (id) => {
        const newtodoList = [...todoList];
        const completedItemIndex = todoList.findIndex((todo) => todo.id == id);
        newtodoList[completedItemIndex].complete = true;
        settodoList(newtodoList);
    };

    useEffect(() => {
        settodoListRemaining(todoList.filter((todo) => todo.complete).length);
    });

    return (
        <View style={styles.todoListContainer}>
            <View style={styles.inputRow}>
                <TextInput
                    style={styles.addTaskInput}
                    placeholder="Add New Task"
                    placeholderTextColor="gray"
                    onChangeText={(text) => setTodo(text)}
                    value={todo}
                />
                <Button title="ADD" onPress={handleAddTodo} />
            </View>
            {todoError && <Text style={styles.inputError}>{todoError}</Text>}
            <Text style={styles.counter}>
                {todoListRemaining} Completed Of {todoList.length}
            </Text>
            <FlatList
                style={styles.list}
                data={todoList}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.todo}>
                        <Text
                            style={[
                                styles.todoText,
                                {
                                    textDecorationLine: item.complete
                                        ? "line-through"
                                        : "none",
                                },
                            ]}
                        >
                            {item.todo}
                        </Text>

                        <TouchableOpacity
                            style={{
                                backgroundColor: "green",
                                padding: 10,
                                borderRadius: 5,
                                alignItems: "center",
                            }}
                            onPress={() => handleCompleteTodo(item.id)}
                        >
                            <Text style={{ color: "white" }}>Done</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{
                                backgroundColor: "red",
                                padding: 10,
                                borderRadius: 5,
                                alignItems: "center",
                            }}
                            onPress={() => handleDeleteTodo(item.id)}
                        >
                            <Text style={{ color: "white" }}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
}