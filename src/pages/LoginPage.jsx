import React from 'react';
import LoginForm  from '../components/Login'

export default function LoginScreen(props) {
  return (
    <LoginForm navigation={props.navigation} />
  );
}

