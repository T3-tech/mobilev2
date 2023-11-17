import { View, Text, TextInput, StyleSheet } from "react-native"
import { useEffect, useState } from "react"
import SelectDropdown from "react-native-select-dropdown"
import { Ionicons } from "@expo/vector-icons"

export default ({ route }) => {    
    const { id, data, servicoNome, clienteNome, clienteId, servicoId ,statusId, navigator } = route.params
    const [dataAgendamento, setDataAgendamento] = useState(data)
    const [servico, setServico] = useState([])
    const [idServico, setServicoId] = useState(servicoId)
    const [cliente, setCliente] = useState([])
    const [idCliente, setClienteId] = useState(clienteId)
    let responsePut

    const getCliente = async () => {
        try {
            const response = await fetch(
                "https://agendamento-api-dev-btxz.3.us-1.fl0.io/api/Clientes"
                )
            const json = await response.json()
            setCliente(json)
        } 
        catch (error) {
            console.error(
                "🚀 ~ file: index.js:24 ~ getCliente ~ console.log(error):",
            )
        }
    }

    const getServico = async () => {
        try {
            const response = await fetch(
                "https://agendamento-api-dev-btxz.3.us-1.fl0.io/api/Servicos"
            )
            const json = await response.json()
            setServico(json)
        } catch (error) {
            console.error(
                "🚀 ~ file: index.js:38 ~ getServico ~ console.log(error):",
            );
        }
    }

    json = JSON.stringify({
        data: dataAgendamento,
        clienteId: Number(idCliente),
        servicoId: Number(idServico),
        statusId: Number(statusId),
    })

    const editarAgendamento = async () => {
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
                "🚀 ~ file: index.js:65 ~ editAgendamento ~ console.log(error):"
            )
        } finally {
            if (responsePut.status === 400) {
                alert("Erro ao editar agendamento.")
                return
            } 
            alert("Agendamento editado com sucesso!")
            navigator.navigate("ListarAgendamento")
        }
    }

    const regex = `^(0[1-9]|[12][0-9]|3[01])[-](0[1-9]|1[012])[-](202[0-9])[ ](0[0-9]|1[0-9]|2[0123])[:](0[0-9]|[12345][0-9])`

    const patern = new RegExp(regex)
    
    function validateServicoId(nomeServico) {
        servico.map((item) => {
            if (nomeServico.includes(item.nome)) {
                setServicoId(item.id)
            }
        });
    }

    function validateClienteId(nomeCliente) {
        cliente.map((item) => {
            if (item.nome === nomeCliente) {
                setClienteId(item.id)
            }
        });
    }

    useEffect(() => {
        getCliente()
        getServico()
    }, []);

    return (
        <>
            <View style={styles.container}>
                <TextInput style={styles.input}
                    placeholder='Data/Hora'
                    value={dataAgendamento}
                    onChangeText={setDataAgendamento}
                    placeholderTextColor={"#fff"}>
                </TextInput>
                <Text>Padrão para data: dd-mm-aaaa hh:mm</Text>
                <SelectDropdown
                    data={cliente.map((item) => item.nome)}
                    onSelect={(selectedItem, index) => {
                        validateClienteId(selectedItem)
                    }}
                    defaultButtonText={clienteNome}
                    searchPlaceHolder={"Pesquisar cliente"}
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
                <SelectDropdown
                    data={servico.map((item) => item.nome + " - R$" + item.valor)}
                    onSelect={(selectedItem, index) => {
                        validateServicoId(selectedItem)
                    }}
                    defaultButtonText={servicoNome}
                    searchPlaceHolder={"Pesquisar serviço"}
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
                    onPress={() => editarAgendamento()}
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