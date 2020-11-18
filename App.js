import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LoginForm  from './src/components/Login'
import RegisterForm  from './src/components/Register'

export default function App() {
  return (
    <View style={styles.container}>
      <RegisterForm></RegisterForm>
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
