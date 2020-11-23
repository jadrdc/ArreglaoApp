import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SignInLogingFlowNavigation from './src/navigation/SignLoginNavigation'
import RegisterScreen from './src/pages/Register'
import LoginScreen from './src/pages/Login'
import firebaseApp from './src/utils/firebase'
import HomeCategory from './src/components/HomeCategory'

export default function App() {

const signUser={
  academic: "Primaria",
  address: "Avenida Independencia ,#1103 Residencial Don Pedro",
  birthdate: "22/11/2020",
  email: "jadrdc@gmail.com",
  isProfesional: false,
  name: "José Agustín Reinoso",
  nationality: "Dominicana ",
  password: "123456",
  phoneNumber: "8492605023",
  sex: "Masculino",
 }
     
  
  return (
    <View style={styles.container}>
      <HomeCategory></HomeCategory>
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
