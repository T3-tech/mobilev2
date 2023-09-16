import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ListarAgendamento from "../pages/Agendamento/Listar";
import Funcionario from "../pages/Funcionario/Listar";
import ListaServico from "../pages/Servico/Listar";
import BotaoCriar from "../components/BotaoCriar";
import ListaFaturamento from "../pages/Faturamento/Listar";
import ListaFuncionario from "../pages/Funcionario/Listar";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default (props) => (
    <Tab.Navigator>
        <Tab.Screen
            name="ListarAgendamento"
            component={ListarAgendamento}
            options={({ navigation }) => {
                return {
                    title: "Agendamentos",
                    tabBarIcon: ({ color, size, focused }) => {
                        if (focused) {
                            return (
                                <Ionicons
                                    name="home"
                                    size={size}
                                    color={color}
                                />
                            );
                        }

                        return (
                            <Ionicons
                                name="home-outline"
                                size={size}
                                color={color}
                            />
                        );
                    },

                    headerRight: () =>
                        BotaoCriar("CadastraAgendamento", navigation),
                };
            }}
        />

        <Tab.Screen
            name="ListaServico"
            component={ListaServico}
            options={({ navigation }) => {
                return {
                    title: "Serviço",
                    tabBarIcon: ({ color, size, focused }) => {
                        if (focused) {
                            return (
                                <MaterialCommunityIcons
                                    name="face-woman-shimmer"
                                    size={size}
                                    color={color}
                                />
                            );
                        }

                        return (
                            <MaterialCommunityIcons
                                name="face-woman-shimmer-outline"
                                size={size}
                                color={color}
                            />
                        );
                    },

                    headerRight: () =>
                        BotaoCriar("CadastraServico", navigation),
                };
            }}
        />

        <Tab.Screen
            name="ListaFaturamento"
            component={ListaFaturamento}
            options={({ navigation }) => {
                return {
                    title: "Faturamento",
                    tabBarIcon: ({ color, size, focused }) => {
                        if (focused) {
                            return (
                                <Ionicons
                                    name="wallet"
                                    size={size}
                                    color={color}
                                />
                            );
                        }

                        return (
                            <Ionicons
                                name="wallet-outline"
                                size={size}
                                color={color}
                            />
                        );
                    },
                    headerRight: () => BotaoCriar("Percentual", navigation),
                };
            }}
        />

        <Tab.Screen
            name="ListaFuncionario"
            component={ListaFuncionario}
            options={({ navigation }) => {
                return {
                    title: "Funcionários",
                    tabBarIcon: ({ color, size, focused }) => {
                        if (focused) {
                            return (
                                <Ionicons
                                    name="md-people-sharp"
                                    size={size}
                                    color={color}
                                />
                            );
                        }

                        return (
                            <Ionicons
                                name="md-people-outline"
                                size={size}
                                color={color}
                            />
                        );
                    },
                    headerRight: () =>
                        BotaoCriar("CadastraFuncionario", navigation),
                };
            }}
        />
    </Tab.Navigator>
);
