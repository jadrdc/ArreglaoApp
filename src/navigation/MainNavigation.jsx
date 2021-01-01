import * as React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import HomeNavigation from './HomeNavigation'


export default function MainNavigation() {
    const MyTheme = {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            background: 'white'
        },
    };
    return (
        <NavigationContainer theme={MyTheme} screenOptions={{
            headerShown: false
        }}>
            <Stack.Navigator>
                <Stack.Screen name="Login" component={LoginPage} />
                <Stack.Screen name="Register" component={RegisterPage} />
                <Stack.Screen name="Home" component={HomeNavigation} options={{
                    headerShown: false
                }} />
            </Stack.Navigator>
        </NavigationContainer>
    )

}