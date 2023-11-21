import {
    Text,
    TextInput,
    View,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";

export default (props) => {
    const URL = "https://agendamento-api-dev-btxz.3.us-1.fl0.io/api/Clientes";
    const [nome, setNome] = useState("");
    const [cpf, setCpf] = useState("");
    const [telefone, setTelefone] = useState("");

    function limpar() {
        setNome("");
        setCpf("");
        setTelefone("");
    }

    function enviar() {
        if (nome === "" || cpf === "" || telefone === "") {
            alert("Por favor, preencha todos os campos.");
        } else {
            const cliente = {
                nome: nome,
                cpf: cpf,
                telefone: telefone,
            };
            cadastrarCliente(cliente);
        }
    }

    const cadastrarCliente = async (cliente) => {
        try {
            const response = await fetch(URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(cliente),
            });
            if (response.ok) {
                alert("Cliente cadastrado com sucesso!");
                limpar();
            } else {
                alert(
                    "Erro ao cadastrar o cliente. Por favor, tente novamente."
                );
            }
        } catch (error) {
            console.error("Erro:", error);
            alert("Erro ao cadastrar o cliente. Por favor, tente novamente.");
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.formContainer}>
                <TextInput
                    style={[styles.inputStyle, styles.blackBorder]}
                    placeholder="Nome do Cliente"
                    value={nome}
                    onChangeText={setNome}
                    placeholderTextColor="#000"
                />

                <TextInput
                    style={[styles.inputStyle, styles.blackBorder]}
                    placeholder="Cpf do Cliente"
                    value={cpf}
                    onChangeText={setCpf}
                    placeholderTextColor="#000"
                />

                <TextInput
                    style={[styles.inputStyle, styles.blackBorder]}
                    placeholder="Telefone do Cliente"
                    value={telefone}
                    onChangeText={setTelefone}
                    placeholderTextColor="#000"
                />
            </View>
            <View style={styles.greenIconContainer}>
                <TouchableOpacity
                    style={[styles.button, styles.greenButton]}
                    onPress={() => enviar()}
                >
                    <Ionicons
                        name="checkmark-circle-outline"
                        size={30}
                        color="white"
                    />
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
    formContainer: {
        width: "80%",
    },
    inputStyle: {
        backgroundColor: "#FFFFFF",
        borderRadius: 10,
        marginBottom: 20,
        paddingLeft: 10,
        height: 50,
    },
    blackBorder: {
        borderWidth: 1,
        borderColor: "#000",
    },
    greenIconContainer: {
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
});
