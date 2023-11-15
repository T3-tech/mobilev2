import { View, Text, TextInput, StyleSheet, Alert } from "react-native"
import { useEffect, useState } from "react"
import SelectDropdown from "react-native-select-dropdown"
import { Ionicons } from "@expo/vector-icons"

export default ({ route }) => {    
    const { id, data, nomeServico, nomeStatus, navigator } = route.params
    const [dataAgendamento, setDataAgendamento] = useState(data)
    const [servico, setServico] = useState([])
    const [status, setStatus] = useState([])
    const NO_CONTENT = 204

    const getServico = async () => {
        try {
            const response = await fetch(
                "https://agendamento-api-dev-btxz.3.us-1.fl0.io/api/Servicos"
            )
            const json = await response.json()
            setServico(json)
        } catch (error) {
            console.error(
                "🚀 ~ file: index.js:22 ~ getServico ~ console.log(error):",
            );
        }
    }

    const getStatus = async () => {
        try {
            const response = await fetch(
                "https://agendamento-api-dev-btxz.3.us-1.fl0.io/api/Status"
            )
            const json = await response.json()
            setStatus(json)
        } catch (error) {
            console.error(
                "🚀 ~ file: index.js:49 ~ getServico ~ console.log(error):",
            );
        }
    }

    const editAgendamento = async () => {
        try {
            const response = await fetch(
                `https://agendamento-api-dev-btxz.3.us-1.fl0.io/api/Agendamentos/${id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(dataAgendamento),
                }
            );
        } catch (error) {
            console.error(
                "🚀 ~ file: index.js:53 ~ editAgendamento ~ console.log(error):"
            );
        } finally {
            if (response.status !== NO_CONTENT) {
                Alert.alert(
                    "Erro ao editar agendamento!",
                    "Nenhum campo pode estar vazio!"
                );
            } else {
                Alert.alert("Agendamento editado com sucesso!")
                navigator.navigate("ListaAgendamento")
            }
        }
    };

    function validateServicoId(nomeServico) {
        servico.map((item) => {
            if (item.nome === nomeServico) {
                setServico(item.id);
            }
        })
    }

    useEffect(() => {
        getServico()
        getStatus()
    }, []);

    return (
        <>
            <View style={styles.container}>
                <Text style={styles.textoInput}>Escolha uma data</Text>
                <TextInput
                    placeholderTextColor={"#FFF"}
                    style={styles.input}
                    placeholder="Data"
                    onChangeText={setDataAgendamento}
                    defaultValue={data}
                    value={dataAgendamento}
                />
                <Text style={styles.textoInput}>Escolha um serviço</Text>
                <SelectDropdown
                    data={servico.map((item) => item.nome)}
                    onSelect={(selectedItem, index) => {
                        validateServicoId(selectedItem)
                    }}
                    defaultButtonText={nomeServico}
                    searchPlaceHolder={"Pesquisar serviço"}
                    key={servico.map((item) => item.id)}
                    buttonStyle={{
                        justifyContent: "center",
                        alignItems: "center",
                        width: 350,
                        height: 40,
                        margin: 10,
                        borderRadius: 5,
                        backgroundColor: "#6E6E6E",
                    }}
                    buttonTextStyle={{color: "#FFF"}}
                    search={true}
                />
                <Text style={styles.textoInput}>Altere o status</Text>
                <SelectDropdown
                    data={status.map((item) => item.nome)}
                    onSelect={(selectedItem, index) => {
                        setStatus(selectedItem)
                    }}
                    defaultButtonText={nomeStatus}
                    searchPlaceHolder={"Pesquisar status"}
                    key={status.map((item) => item.id)}
                    buttonStyle={{
                        justifyContent: "center",
                        alignItems: "center",
                        width: 350,
                        height: 40,
                        margin: 10,
                        borderRadius: 5,
                        backgroundColor: "#6E6E6E",
                    }}
                    buttonTextStyle={{color: "#FFF"}}
                    search={true}
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
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 60,
        alignItems: "center",
        justifyContent: "center",
    },
    input: {
        margin: 10,
        padding: 10,
        width: 350,
        height: 40,
        backgroundColor: "#6E6E6E",
        borderRadius: 5,
        justifyContent: "center",
        textAlign:'center',
        color: "#FFF",
        fontSize: 17,
    },
    viewButton: {
        flex: 1,
        marginTop: 20,
        flexDirection: "row",
        justifyContent: "space-around",
    },
    textoInput: {
        fontSize: 15,
        fontWeight: "bold",
    },
})