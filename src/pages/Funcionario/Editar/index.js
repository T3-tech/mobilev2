import {
    Text,
    TextInput,
    View,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
} from "react-native";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";

export default ({ route }) => {
    const { id, nome, telefone, cpf } = route.params;
    const URL = `https://agendamento-api-dev-btxz.3.us-1.fl0.io/api/Profissionais/${id}`;
    const [nomeProfissional, setNomeProfissional] = useState(nome);
    const [telefoneProfissional, setTelefoneProfissional] = useState(telefone);
    const [cpfProfissional, setCpfProfissional] = useState(cpf);
    const BAD_REQUEST = 400;
    const NO_CONTENT = 204;
    let response;

    function limpar() {
        setNomeProfissional("");
        setCpfProfissional("");
        setTelefoneProfissional("");
    }

    function validarCPF(cpf) {
        cpf = cpf.replace(/[^\d]/g, ""); // Remove caracteres não numéricos

        if (cpf.length !== 11 || /^(.)\1+$/.test(cpf)) {
            return false; // Verifica se o CPF tem 11 dígitos e não é uma sequência de números repetidos
        }

        // Calcula o primeiro dígito verificador
        let soma = 0;
        for (let i = 0; i < 9; i++) {
            soma += parseInt(cpf.charAt(i)) * (10 - i);
        }
        let digito1 = 11 - (soma % 11);

        if (digito1 > 9) {
            digito1 = 0;
        }

        // Calcula o segundo dígito verificador
        soma = 0;
        for (let i = 0; i < 10; i++) {
            soma += parseInt(cpf.charAt(i)) * (11 - i);
        }
        let digito2 = 11 - (soma % 11);

        if (digito2 > 9) {
            digito2 = 0;
        }

        // Verifica se os dígitos verificadores calculados correspondem aos dígitos do CPF
        if (
            parseInt(cpf.charAt(9)) === digito1 &&
            parseInt(cpf.charAt(10)) === digito2
        ) {
            return true;
        } else {
            return false;
        }
    }

    function enviar() {
        if (
            nomeProfissional == "" ||
            cpfProfissional == "" ||
            telefoneProfissional == ""
        ) {
            alert("Checar se alguma informação está nula");
        }
        if (!validarCPF(cpfProfissional)) {
            alert("CPF com padrão incorreto");
        } else {
            const profissional = {
                nome: nomeProfissional,
                cpf: cpfProfissional,
                telefone: telefoneProfissional,
            };
            editarProfissional(profissional);
        }
    }

    const editarProfissional = async (profissional) => {
        try {
            response = await fetch(URL, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(profissional),
            });
        } catch (error) {
            console.error(
                "🚀 ~ file: index.js:98 ~ putProfissional ~ console.log(error):"
            );
        } finally {
            if (response.status == BAD_REQUEST) {
                alert("CPF JÁ CADASTRADO");
            } else if (response.status === NO_CONTENT) {
                alert("EDITADO COM SUCESSO");
                limpar();
            }
        }
    };

    return (
        <SafeAreaView>
            <View>
                <View style={styles.containerInterno}>
                    <TextInput
                        style={styles.inputStyle}
                        placeholder="Nome"
                        onChangeText={setNomeProfissional}
                        value={nomeProfissional}
                        defaultValue={nomeProfissional}
                        placeholderTextColor={"#fff"}
                    ></TextInput>

                    <TextInput
                        style={styles.inputStyle}
                        placeholder="Cpf"
                        onChangeText={setCpfProfissional}
                        value={cpfProfissional}
                        defaultValue={cpfProfissional}
                        placeholderTextColor={"#fff"}
                    ></TextInput>

                    <TextInput
                        style={styles.inputStyle}
                        placeholder="Telefone"
                        onChangeText={setTelefoneProfissional}
                        value={telefoneProfissional}
                        defaultValue={telefoneProfissional}
                        placeholderTextColor={"#fff"}
                    ></TextInput>
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
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    inputStyle: {
        margin: 10,
        padding: 10,
        width: 350,
        height: 40,
        backgroundColor: "#6E6E6E",
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
    },

    containerInterno: {
        justifyContent: "center",
        alignItems: "center",
        margin: 50,
    },
    botao: {
        width: 230,
        height: 50,
        borderWidth: 2,
        borderRadius: 25,
        borderColor: "#000",
        marginTop: 50,
    },
    viewIcon: {
        marginTop: 20,
        flexDirection: "row",
        justifyContent: "space-around",
    },
});
