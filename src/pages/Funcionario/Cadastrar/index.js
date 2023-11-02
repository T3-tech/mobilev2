import { Text, TextInput, View, StyleSheet, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";

export default (pros) => {
    const URL = "https://agendamento-api-dev-btxz.3.us-1.fl0.io/api/Profissionais";
    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [telefone, setTelefone] = useState('');

    const attNome = (text) => {
        setNome(text);
    }
    const attCpf = (text) => {
        setCpf(text);
    }
    const attTelefone = (text) => {
        setTelefone(text);
    }

    function limpar() {
        setNome('');
        setCpf('');
        setTelefone('');
    }

    function enviar() {
        if (nome == "" || cpf == "" || telefone == "") {
            alert("Checar se alguma informação está nula");
        } else {
            const profissional = {
                nome: nome,
                cpf: cpf,
                telefone: telefone
            };
            cadastrarProfissional(profissional);
        }

    }

    const cadastrarProfissional = async (profissional) => {
        try {
            await fetch(URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(profissional),
            })
        } catch (error) {
            console.error(
                "🚀 ~ file: index.js:46 ~ postProfissional ~ console.log(error):",
            );
        } finally {
            limpar();
        }





    }

    return (
        <View >
            <View style={styles.containerInterno}>
                <TextInput style={styles.inputStyle}
                    placeholder='Nome'
                    value={nome}
                    onChangeText={attNome}
                    placeholderTextColor={"#fff"}>
                </TextInput>

                <TextInput style={styles.inputStyle}
                    placeholder="Cpf"
                    value={cpf}
                    onChangeText={attCpf}
                    placeholderTextColor={"#fff"}>
                </TextInput>

                <TextInput style={styles.inputStyle}
                    placeholder="Telefone"
                    value={telefone}
                    onChangeText={attTelefone}
                    placeholderTextColor={"#fff"}>
                </TextInput>
            </View>

            <View style={styles.viewIcon}>
                <View>
                    <Ionicons
                        name="trash-outline"
                        size={25}
                        color={"red"}
                        onPress={() => limpar()}
                    />
                </View>
                <View>
                    <Ionicons
                        name="checkmark-circle-outline"
                        size={25}
                        color={"green"}
                        onPress={() => enviar()}
                    />
                </View>
            </View>

        </View>
    );



};

const styles = StyleSheet.create({

    inputStyle: {
        borderRadius: 20,
        width: 350,
        height: 40,
        marginTop: 25,
        fontSize: 20,
        padding: 5,
        backgroundColor: "#6E6E6E"


    },

    containerInterno: {
        justifyContent: "center",
        alignItems: "center",
        margin: 50
    },
    botao: {
        width: 230,
        height: 50,
        borderWidth: 2,
        borderRadius: 25,
        borderColor: "#000",
        marginTop: 50

    },
    viewIcon: {
        marginTop: 20,
        flexDirection: "row",
        justifyContent: "space-around",
    }



});
