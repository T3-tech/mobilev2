import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../pages/Home";
import index from "../pages/Funcionario"
const Tab = createBottomTabNavigator();

export default props => (
    <Tab.Navigator>
        <Tab.Screen
            name="Home"
            component={Home}
            options={{ tabBarLabel: 'Home', headerShown: false }}

        />


        <Tab.Screen
            name="index"
            component={index}
            options={{ tabBarLabel: 'index', headerShown: false }}
        />

    </Tab.Navigator>
)