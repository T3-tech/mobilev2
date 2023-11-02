import { Text, TextInput, View, StyleSheet, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";


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
            setNome();
            setCpf();
            setTelefone();
        }





    }

    return (
        <View style={styles.container}>
            <TextInput style={styles.inputStyle}
                placeholder='Nome'
                value={nome}
                onChangeText={attNome}
                placeholderTextColor={"#000"}>
            </TextInput>

            <TextInput style={styles.inputStyle}
                placeholder="Cpf"
                value={cpf}
                onChangeText={attCpf}
                placeholderTextColor={"#000"}>
            </TextInput>

            <TextInput style={styles.inputStyle}
                placeholder="Telefone"
                value={telefone}
                onChangeText={attTelefone}
                placeholderTextColor={"#000"}>
            </TextInput>


            <TouchableOpacity onPress={() => enviar()}

                style={styles.botao}>
                <View style={styles.btnArea}>
                    <Text style={styles.textoBotao}>
                        Enviar
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    );



};

const styles = StyleSheet.create({

    inputStyle: {
        borderRadius: 20,
        width: 200,
        height: 40,
        borderWidth: 2,
        borderColor: "#000",
        marginTop: 25,
        fontSize: 20,
        padding: 5,



    },
    container: {
        alignItems: "center"
    },
    botao: {
        width: 230,
        height: 50,
        borderWidth: 2,
        borderRadius: 25,
        borderColor: "#000",
        marginTop: 50

    },
    textoBotao: {
        color: '#000',
        fontSize: 18,
        fontWeight: 'bold'
    },
    btnArea: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    }


});
