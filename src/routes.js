import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import Home from './pages/Home'
import Funcionario from './pages/Funcionario';

const Tab = createBottomTabNavigator();

export default function Routes() {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name='Home' component={Home} />
                <Tab.Screen name='Funcionario' component={Funcionario} />
            </Tab.Navigator>
        </NavigationContainer>
    )
}