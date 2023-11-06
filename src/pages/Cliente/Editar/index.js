import React, { useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default ({ route }) => {
    const { id, nome, cpf, telefone } = route.params;
    const [clienteId, setClienteId] = useState(id);
    const [clienteNome, setClienteNome] = useState(nome);
    const [clienteCpf, setClienteCpf] = useState(cpf);
    const [clienteTelefone, setClienteTelefone] = useState(telefone);

    const URL = "https://agendamento-api-dev-btxz.3.us-1.fl0.io/api/Clientes";

    const editarCliente = async () => {
        if (!clienteNome || !clienteCpf || !clienteTelefone) {
            Alert.alert("Erro ao editar cliente", "Preencha todos os campos.");
            return;
        }

        try {
            const response = await fetch(`${URL}/${clienteId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    nome: clienteNome,
                    cpf: clienteCpf,
                    telefone: clienteTelefone,
                }),
            });

            if (response.status === 204) {
                Alert.alert("Cliente editado com sucesso");
            } else {
                Alert.alert("Erro ao editar cliente", "Por favor, tente novamente.");
            }
        } catch (error) {
            console.error("Erro:", error);
            Alert.alert("Erro ao editar cliente", "Por favor, tente novamente.");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.textoInput}>Nome do Cliente</Text>
            <TextInput
                style={[styles.inputStyle, styles.blackBorder]}
                placeholder='Nome'
                value={clienteNome}
                onChangeText={(text) => setClienteNome(text)}
                placeholderTextColor="#000"
            />            


            <Text style={styles.textoInput}>CPF do Cliente</Text>
            <TextInput
                style={[styles.inputStyle, styles.blackBorder]}
                placeholder="Cpf"
                value={clienteCpf}
                onChangeText={(text) => setClienteCpf(text)}
                placeholderTextColor="#000"
            />


            <Text style={styles.textoInput}>Telefone do Cliente</Text>
            <TextInput
                style={[styles.inputStyle, styles.blackBorder]}
                placeholder="Telefone"
                value={clienteTelefone}
                onChangeText={(text) => setClienteTelefone(text)}
                placeholderTextColor="#000"
            />

            <View style={styles.greenIconContainer}>
                <TouchableOpacity
                    style={[styles.button, styles.greenButton]}
                    onPress={() => editarCliente()}
                >
                    <Ionicons name="checkmark-circle-outline" size={30} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F5F5",
        justifyContent: "center",
        alignItems: "center",
    },
    button: {
        backgroundColor: "#6E6E6E",
        borderRadius: 25,
        padding: 10,
        alignItems: "center",
        width: 60,
        height: 60,
        justifyContent: "center",
    },
    greenButton: {
        backgroundColor: "green",
    },
    viewInput: {
        margin: 10,
        padding: 10,
        width: 350,
        height: 40,
        backgroundColor: "#6E6E6E",
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
        color: "#FFFFFF",
    },
    textoInput: {
        fontSize: 15,
        fontWeight: "bold",

    },
    inputStyle: {
        backgroundColor: "#FFFFFF",
        borderRadius: 10,
        marginBottom: 20,
        paddingLeft: 10,
        height: 50,
        width: "80%",
    },
    blackBorder: {
        borderWidth: 1,
        borderColor: "#000",
    },
    greenIconContainer: {
        justifyContent: "center",
        alignItems: "center",
    },
});