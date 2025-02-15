import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Login from "../pages/Login";
import Tab from "./Tab";
import CadastraAgendamento from "../pages/Agendamento/Cadastrar";
import CadastraServico from "../pages/Servico/Cadastrar";
import CadastraFuncionario from "../pages/Funcionario/Cadastrar";
import EditarServico from "../pages/Servico/Editar";
import EditarProfissional from "../pages/Funcionario/Editar";
import CadastrarCliente from "../pages/Cliente/Cadastrar";
import EditarCliente from "../pages/Cliente/Editar";
import EditarAgendamento from "../pages/Agendamento/Editar";
import ListarPorId from "../pages/Funcionario/Listar/indexgetid";
import statusPorId from "../pages/Agendamento/Listar/statusPorId";
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
                    component={CadastraAgendamento}
                    options={{ title: "Cadastrar agendamento" }}
                />
                <navegacaoStack.Screen
                    name="CadastraServico"
                    component={CadastraServico}
                    options={{ title: "Cadastrar serviço" }}
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
                    options={{ title: "Cadastrar Cliente" }}
                />
                <navegacaoStack.Screen
                    name="EditarCliente"
                    component={EditarCliente}
                    options={{ title: "Editar Cliente" }}
                />
                <navegacaoStack.Screen
                    name="ListarPorId"
                    component={ListarPorId}
                    options={{ title: "Detalhe Funcionario" }}
                />
                <navegacaoStack.Screen
                    name="EditarAgendamento"
                    component={EditarAgendamento}
                    options={{ title: "Editar Agendamento" }}
                />
                <navegacaoStack.Screen
                    name="StatusPorId"
                    component={statusPorId}
                    options={{ title: "Editar Status" }}
                />
            </navegacaoStack.Navigator>
        </NavigationContainer>
    );
}
