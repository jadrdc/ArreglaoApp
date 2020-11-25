import * as React from 'react';
import { NavigationContainer ,DefaultTheme} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();
import ServiceOfferListPage from '../pages/ServicesOfferListPage'
import HomePage from '../pages/HomePage'


export default function ServiceNavigation() {

    return (

            <Stack.Navigator>
                <Stack.Screen name="Servicios" component={HomePage} />
                <Stack.Screen name="Lista de Servicios" component={ServiceOfferListPage} />
            </Stack.Navigator>

    )

}