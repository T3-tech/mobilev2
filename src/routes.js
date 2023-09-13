import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import Home from './pages/Home'

import Login from './pages/Login';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function Routes() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Login' options={{ headerShown: false }}>
                <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />

                <Stack.Screen name='Home' component={Home} options={{ headerShown: false }} />

            </Stack.Navigator>


        </NavigationContainer >

    )
}