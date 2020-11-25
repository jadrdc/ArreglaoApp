import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import firebaseApp from './src/utils/firebase'
import MainNavigation from './src/navigation/MainNavigation'
//import ServiceNavigation from './src/navigation/ServiceNavigation'





export default function App() {


  return (
      <MainNavigation></MainNavigation>
  );
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 16,
    marginRight: 16,
    flexDirection: "row",
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});