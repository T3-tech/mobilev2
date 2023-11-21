import { View, Text, TextInput, StyleSheet, Alert } from "react-native";
import { useEffect, useState } from "react";
import SelectDropdown from "react-native-select-dropdown";
import { Ionicons } from "@expo/vector-icons";

export default (props) => {
    const [nomeServico, setNomeServico] = useState("");
    const [valorServico, setValor] = useState("");
    const [idProfissionalServico, setIdProfissional] = useState("");
    const [profissional, setProfissional] = useState([]);
    var responsePost;
    var STATUS_OK = 200;

    const getProfissional = async () => {
        try {
            const response = await fetch(
                "https://agendamento-api-dev-btxz.3.us-1.fl0.io/api/Profissionais"
            );
            const json = await response.json();
            setProfissional(json);
        } catch (error) {
            console.error(
                "🚀 ~ file: index.js:23 ~ getProfissional ~ console.log(error):"
            );
        }
    };

    json = JSON.stringify({
        nome: nomeServico,
        valor: parseFloat(valorServico),
        profissionalId: idProfissionalServico,
    });

    const criarServico = async () => {
        try {
            responsePost = await fetch(
                "https://agendamento-api-dev-btxz.3.us-1.fl0.io/api/Servicos",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: json,
                }
            );
        } catch (error) {
            console.error(
                "🚀 ~ file: index.js:48 ~ criarServico ~ console.log(error):"
            );
        } finally {
            if (responsePost.status == STATUS_OK) {
                Alert.alert("Serviço cadastrado com sucesso!");
                props.navigation.navigate("ListaServico");
            } else {
                Alert.alert(
                    "Erro ao cadastrar serviço!",
                    "Verifique se algum campo está vazio."
                );
            }
        }
    };

    function validateProfissionalId(nomeProfissional) {
        profissional.map((item) => {
            if (item.nome === nomeProfissional) {
                setIdProfissional(item.id);
            }
        });
    }

    function limpar() {
        setNomeServico("");
        setValor("");
    }

    useEffect(() => {
        getProfissional();
    }, []);

    return (
        <>
            <View style={styles.container}>
                <TextInput
                    style={styles.viewInput}
                    placeholder="Nome do serviço"
                    onChangeText={setNomeServico}
                    placeholderTextColor={"#fff"}
                    value={nomeServico}
                />

                <TextInput
                    keyboardType="numeric"
                    style={styles.viewInput}
                    placeholder="Valor do serviço"
                    onChangeText={setValor}
                    placeholderTextColor={"#fff"}
                    value={valorServico}
                />
                <SelectDropdown
                    data={profissional.map((item) => item.nome)}
                    onSelect={(selectedItem, index) => {
                        validateProfissionalId(selectedItem);
                    }}
                    defaultButtonText={"Escolha um profissional"}
                    searchPlaceHolder={"Pesquisar profissional"}
                    buttonStyle={{
                        backgroundColor: "#6E6E6E",
                        borderRadius: 5,
                        width: 350,
                        height: 40,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                    buttonTextStyle={{ color: "#FFF" }}
                    search={true}
                />
            </View>

            <View style={styles.viewButton}>
                <Ionicons
                    name="checkmark-circle-outline"
                    size={30}
                    color={"green"}
                    onPress={() => criarServico()}
                />
                <Ionicons
                    name="trash-outline"
                    size={30}
                    color={"red"}
                    onPress={() => limpar()}
                />
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 60,
        alignItems: "center",
        justifyContent: "center",
    },
    viewButton: {
        flex: 1,
        marginTop: 20,
        flexDirection: "row",
        justifyContent: "space-around",
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
});
