import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import Home from './pages/Home'

import Login from './pages/Login';
const Stack = createNativeStackNavigator();


export default function Routes() {
    return (

        <Stack.Navigator>
            <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />

            <Stack.Screen name='Home' component={Home} options={{ headerShown: false }} />
        </Stack.Navigator>

    )
}