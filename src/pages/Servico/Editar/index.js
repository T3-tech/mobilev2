import { View, Text, TextInput, StyleSheet, Alert } from "react-native";
import { useEffect, useState } from "react";
import SelectDropdown from "react-native-select-dropdown";
import { Ionicons } from "@expo/vector-icons";

export default ({ route }) => {
    const { nome, id, valor, idProfissional, navigator } = route.params;
    const [nomeServico, setNomeServico] = useState(nome);
    const [valorSerivo, setValor] = useState(valor);
    const [idProfissionalServico, setIdProfissional] = useState(idProfissional);
    const [profissional, setProfissional] = useState([]);
    const NO_CONTENT = 204;
    var responsePut;

    const getProfissional = async () => {
        try {
            const response = await fetch(
                "https://agendamento-api-dev-btxz.3.us-1.fl0.io/api/Profissionais"
            );
            const json = await response.json();
            setProfissional(json);
        } catch (error) {
            console.error(
                "🚀 ~ file: index.js:32 ~ getAgendamento ~ console.log(error):"
            );
        }
    };

    json = JSON.stringify({
        nome: nomeServico,
        valor: parseFloat(valorSerivo),
        profissionalId: idProfissionalServico,
    });

    const editAgendamento = async () => {
        try {
            responsePut = await fetch(
                `https://agendamento-api-dev-btxz.3.us-1.fl0.io/api/Servicos/${id}`,
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
                    "Erro ao editar serviço!",
                    "Nenhum campo pode estar vazio!"
                );
            } else {
                Alert.alert("Serviço editado com sucesso!");
                navigator.navigate("ListaServico");
            }
        }
    };

    const nomeDefault = profissional.map((item) => {
        if (item.id === idProfissionalServico) {
            return item.nome;
        }
    });

    function validateProfissionalId(nomeProfissional) {
        profissional.map((item) => {
            if (item.nome === nomeProfissional) {
                setIdProfissional(item.id);
            }
        });
    }

    useEffect(() => {
        getProfissional();
    }, []);

    return (
        <>
            <View style={styles.container}>
                <Text style={styles.textoInput}>Nome do serviço Serviço</Text>
                <TextInput
                    style={styles.viewInput}
                    placeholder="Nome do serviço"
                    onChangeText={setNomeServico}
                    value={nomeServico}
                    defaultValue={nomeServico}
                />
                <Text style={styles.textoInput}>Valor do serviço</Text>
                <TextInput
                    keyboardType="numeric"
                    style={styles.viewInput}
                    placeholder="Valor do serviço"
                    onChangeText={setValor}
                    value={String(valorSerivo)}
                    defaultValue={String(valorSerivo)}
                />
                <Text style={styles.textoInput}>Escolha um Profissional</Text>
                <SelectDropdown
                    data={profissional.map((item) => item.nome)}
                    onSelect={(selectedItem, index) => {
                        validateProfissionalId(selectedItem);
                    }}
                    defaultButtonText={nomeDefault}
                />
            </View>

            <View style={styles.viewButton}>
                <Ionicons
                    name="checkmark-circle-outline"
                    size={50}
                    color={"green"}
                    onPress={() => editAgendamento()}
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
        alignItems: "center",
        justifyContent: "center",
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
