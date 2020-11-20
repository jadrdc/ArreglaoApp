import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SignInLogingFlowNavigation from './src/navigation/SignLoginNavigation'
import RegisterScreen from './src/pages/Register'
import LoginScreen from './src/pages/Login'
import firebaseApp from './src/utils/firebase'

export default function App() {

 
  
  return (
    <View style={styles.container}>
      <RegisterScreen></RegisterScreen>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginLeft:16,
    marginRight:16,
  flexDirection:"row",
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
