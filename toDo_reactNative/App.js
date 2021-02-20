import React, { useState } from 'react';
import { StyleSheet, Alert, View, FlatList, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Header from "./components/header";
import TodoItem from './components/todoItem';
import AddTodo from './components/addTodo';

export default function App() {

  const [todos, setTodos] = useState([
    { text: 'buy coffee', key: 1 },
    { text: 'create an app', key: 2 },
    { text: 'play on the switch', key: 3 },
  ])

  const pressHandler = key => {
    setTodos(todos.filter(todo => todo.key !== key))
  }

  const submitHandler = text => {

    if (text.length > 1) {
      setTodos(prevTodos => {
        return [
          ...prevTodos, { text, key: Math.random().toString() }
        ]
      })
    } else {
      Alert.alert("Ooops!", "todos must me over 2 chars long.", [
        { text: 'Okay', onPress: () => console.log('alert closed') }
      ])
    }

  }

  return (
    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss();
    }}>
      <View style={styles.container}>
        <Header />
        {/* header */}
        <View style={styles.content}>
          <AddTodo submitHandler={submitHandler} />
          {/* to form */}
          <View style={styles.list}>
            <FlatList
              data={todos}
              renderItem={({ item }) => (
                <TodoItem item={item} pressHandler={pressHandler} />
              )}
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 40,
  },
  list: {
    marginTop: 20,
  }
});
