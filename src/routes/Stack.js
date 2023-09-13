import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';



import Login from '../pages/Login';
import Tab from './Tab';
const navegacaoStack = createNativeStackNavigator();


export default function Stack() {
    return (
        <NavigationContainer>
            <navegacaoStack.Navigator initialRouteName='Login' options={{ headerShown: false }}>
                <navegacaoStack.Screen name='Login' component={Login} options={{ headerShown: false }} />
                <navegacaoStack.Screen name='Tab' component={Tab} options={{ headerShown: false }} />

            </navegacaoStack.Navigator>


        </NavigationContainer >
    )
}