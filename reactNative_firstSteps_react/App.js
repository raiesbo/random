// import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import GameBoard from "./components/gameBoard.component";
import { Provider } from 'react-redux';
import store from './redux/store';


export default function App() {
  return (

    <Provider store={store}>
      <GameBoard />
    </Provider>

  );
}

// const styles = StyleSheet.create({

// });

