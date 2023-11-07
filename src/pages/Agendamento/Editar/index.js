import { View, Text, TextInput, StyleSheet, Alert } from "react-native";
import { useEffect, useState } from "react";
import SelectDropdown from "react-native-select-dropdown";
import { Ionicons } from "@expo/vector-icons";


export default ({ route }) => {    
    




    const getAgendamento = async () => {
        try {
            const response = await fetch(
                "https://agendamento-api-dev-btxz.3.us-1.fl0.io/api/Profissionais"
            );
            const json = await response.json()
            setProfissional(json)
        } catch (error) {
            console.error(
                "🚀 ~ file: index.js:32 ~ getAgendamento ~ console.log(error):"
            );
        }
    }

    const editAgendamento = async () => {
        try {
            responsePut = await fetch(
                `https://agendamento-api-dev-btxz.3.us-1.fl0.io/api/Agendamentos/${id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: json,
                }
            );
        } catch (error) {
            console.error(
                "🚀 ~ file: index.js:32 ~ getAgendamento ~ console.log(error):"
            );
        } finally {
            if (responsePut.status !== NO_CONTENT) {
                Alert.alert(
                    "Erro ao editar agendamento!",
                    "Nenhum campo pode estar vazio!"
                );
            } else {
                Alert.alert("Agendamento editado com sucesso!");
                navigator.navigate("ListaServico");
            }
        }
    };


}
