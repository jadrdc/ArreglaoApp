import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack'
const Tab = createBottomTabNavigator();
import { MaterialCommunityIcons } from 'react-native-vector-icons'
import ProfilePage from '../pages/ProfilePage'
import ServiceNavigation from './ServiceNavigation'
import HistoricPage from '../pages/HistorialPage';
export default function HomeCustomerNavigation(props) {

    return (

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


            <Tab.Screen name="Historial" component={HistoricPage}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="view-list" color={color} size={size} />
                    )

                }} />

            <Tab.Screen name="Perfil" component={ProfilePage}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="face-profile" color={color} size={size} />
                    )

                }} />

        </Tab.Navigator>

    )
}