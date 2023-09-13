import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';



import Login from './pages/Login';
import Tab from './routes/Tab';
const Stack = createNativeStackNavigator();


export default function Routes() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Login' options={{ headerShown: false }}>
                <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
                <Stack.Screen name='Tab' component={Tab} options={{ headerShown: false }} />

            </Stack.Navigator>


        </NavigationContainer >

    )
}