import { View, Text, TextInput, StyleSheet, Alert } from "react-native";
import { useEffect, useState } from "react";
import SelectDropdown from "react-native-select-dropdown";
import { TouchableOpacity } from "react-native";

export default ({ route }) => {
    const { nome, id, valor, idProfissional, navigator } = route.params;
    const [nomeServico, setNomeServico] = useState(nome);
    const [valorSerivo, setValor] = useState(valor);
    const [idProfissionalServico, setIdProfissional] = useState(idProfissional);
    const [profissional, setProfissional] = useState([]);

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

    const editAgendamento = async () => {
        try {
            await fetch(
                `https://agendamento-api-dev-btxz.3.us-1.fl0.io/api/Servicos/${id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        nome: nomeServico,
                        valor: parseFloat(valorSerivo),
                        profissionalId: idProfissionalServico,
                    }),
                }
            );
        } catch (error) {
            console.error(
                "🚀 ~ file: index.js:32 ~ getAgendamento ~ console.log(error):"
            );
        } finally {
            Alert.alert("Serviço editado com sucesso!");
            navigator.navigate("ListaServico");
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
                <TouchableOpacity
                    style={styles.buttonSalvar}
                    onPress={() => editAgendamento()}
                >
                    <Text
                        style={{
                            color: "white",
                            padding: 10,
                            borderRadius: 10,
                        }}
                    >
                        Salvar
                    </Text>
                </TouchableOpacity>
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
    buttonSalvar: {
        backgroundColor: "green",
        borderRadius: 10,
        padding: 10,
        width: 100,
        alignItems: "center",
        justifyContent: "center",
    },

    viewInput: {
        height: 40,
        width: 250,
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        margin: 10,
    },

    textoInput: {
        fontSize: 15,
        fontWeight: "bold",
    },
});
