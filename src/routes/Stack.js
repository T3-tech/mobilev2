import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Login from "../pages/Login";
import Tab from "./Tab";
import CadastraAgendamentos from "../pages/Agendamento/Cadastrar";
import CadastraServico from "../pages/Servico/Cadastrar";
import Percentual from "../pages/Faturamento/Percentual";
import CadastraFuncionario from "../pages/Funcionario/Cadastrar";
import EditarServico from "../pages/Servico/Editar";
import EditarProfissional from "../pages/Funcionario/Editar";
import CadastrarCliente from "../pages/Cliente/Cadastrar";

const navegacaoStack = createNativeStackNavigator();

export default function Stack() {
    return (
        <NavigationContainer>
            <navegacaoStack.Navigator initialRouteName="Login">
                <navegacaoStack.Screen
                    name="Login"
                    component={Login}
                    options={{ headerShown: false }}
                />
                <navegacaoStack.Screen
                    name="Tab"
                    component={Tab}
                    options={{ headerShown: false }}
                />
                <navegacaoStack.Screen
                    name="CadastraAgendamento"
                    component={CadastraAgendamentos}
                    options={{ title: "Cadastrar agendamento" }}
                />
                <navegacaoStack.Screen
                    name="CadastraServico"
                    component={CadastraServico}
                    options={{ title: "Cadastrar serviço" }}
                />
                <navegacaoStack.Screen
                    name="Percentual"
                    component={Percentual}
                    options={{ title: "Percentual" }}
                />
                <navegacaoStack.Screen
                    name="CadastraFuncionario"
                    component={CadastraFuncionario}
                    options={{ title: "Cadastrar funcionário" }}
                />
                <navegacaoStack.Screen
                    name="EditarServico"
                    component={EditarServico}
                    options={{ title: "Editar serviço" }}
                />
                <navegacaoStack.Screen
                    name="EditarProfissional"
                    component={EditarProfissional}
                    options={{ title: "Editar funcionário" }}
                />

                <navegacaoStack.Screen
                    name="CadastrarCliente"
                    component={CadastrarCliente}
                    options={{ headerShown: false }}
                />
            </navegacaoStack.Navigator>
        </NavigationContainer>
    );
}
