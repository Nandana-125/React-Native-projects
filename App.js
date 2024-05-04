// App.js

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, FlatList } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const App = () => {
  const [userName, setUserName] = useState('');
  const [showModal, setShowModal] = useState(true);
  const [todos, setTodos] = useState([]);
  const [newTodoText, setNewTodoText] = useState('');

  const handleContinue = () => {
    if (userName.trim() !== '') {
      setShowModal(false);
    }
  };

  const handleAddTodo = () => {
    if (newTodoText.trim() !== '') {
      setTodos([...todos, { text: newTodoText, done: false }]);
      setNewTodoText('');
    }
  };

  const handleRemoveTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const handleToggleDone = (index) => {
    const newTodos = [...todos];
    newTodos[index].done = !newTodos[index].done;
    setTodos(newTodos);
  };

  return (
    <View style={styles.container}>
      <Modal visible={showModal} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Enter Your Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your name"
              value={userName}
              onChangeText={(value) => setUserName(value)}
            />
            <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
              <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Text style={styles.userName}>Welcome, {userName}</Text>
      <Text style={styles.heading}>Today's Tasks</Text>
      <View style={styles.todoInputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter todo"
          value={newTodoText}
          onChangeText={(value) => setNewTodoText(value)}
        />
        <TouchableOpacity style={[styles.addButton, { backgroundColor: 'purple' }]} onPress={handleAddTodo}>
          <Text style={[styles.buttonText, { color: 'white' }]}>Add Todo</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={todos}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.todoItem}>
            <Text style={styles.todoText}>{item.text}</Text>
            <TouchableOpacity onPress={() => handleRemoveTodo(index)}>
              <MaterialIcons name="delete" size={24} color="red" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleToggleDone(index)}>
              <MaterialIcons name={item.done ? "check-circle" : "check-circle-outline"} size={24} color={item.done ? "green" : "gray"} />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    marginBottom: 20,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  continueButton: {
    backgroundColor: 'lightgreen',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  addButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
  },
  todoInputContainer: {
    marginBottom: 20,
  },
  todoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  todoText: {
    flex: 1,
    marginRight: 10,
  },
});

export default App;
