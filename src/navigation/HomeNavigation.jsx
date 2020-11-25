import React from 'react';
import { NavigationContainer ,DefaultTheme} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack'
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
import { MaterialCommunityIcons } from 'react-native-vector-icons'
import HomePage from '../pages/HomePage'
import ProfilePage from '../pages/ProfilePage'
import ServiceNavigation from './ServiceNavigation'

export default function HomeNavigationPage() {
 

    return (

        <NavigationContainer>
            <Tab.Navigator
            tabBarOptions={{
                activeTintColor: '#ff8c00',
                inactiveTintColor: '#008ba3',
              }}>
                <Tab.Screen name="Servicios" component={ServiceNavigation}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="cart" color={color} size={size} />
                        )
                    }} />
                <Tab.Screen name="Perfil" component={ProfilePage}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="face-profile" color={color} size={size} />
                        )
                    }} />

            </Tab.Navigator>
        </NavigationContainer>

    )

}