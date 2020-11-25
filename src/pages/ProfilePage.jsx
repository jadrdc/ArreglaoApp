import React from 'react';
import UserProfile  from '../components/UserProfile'

export default function ProfilePage() {
  
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
    <UserProfile user={signUser} />
  );
}

